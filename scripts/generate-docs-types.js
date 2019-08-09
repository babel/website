const fs = require("fs");
const path = require("path");
const t = require("@babel/types");
const { promisify } = require("util");

const readfile = promisify(fs.readFile);
const writefile = promisify(fs.writeFile);

const callRegex = /(\w+)(\??:)\s(.+)/;
const signatureRegex = /\((.*)\):\s(\w+)/i;
const typeRegex = /:\s(\w+);$/i;

// const signature = (type, args, returnType) => {
const signature = (type, args) => {
  const required = args
    .map(line => {
      const match = line.match(callRegex);
      if (!match || match[2] === "?:") {
        return;
      }
      return match[1].slice(0, 1) === "_" ? match[1].slice(1) : match[1];
    })
    .filter(s => Boolean(s))
    .join(", ");
  return [
    "```javascript",
    `t.${type}(${required})`,
    // `t.${type}(${required}): ${returnType || "unknown"}`,
    "```",
    "",
  ];
};

const removeNullUndefined = type => {
  if (type.includes("null") || type.includes("undefined")) {
    const types = type.split(" | ");
    return types.filter(a => a !== "null" && a !== "undefined").join(" | ");
  }
  return type;
};

const typeOverwrites = {
  classMethod: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
  memberExpression: {
    property: "if computed then `Expression` else `Identifier`",
  },
  objectMethod: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
  objectProperty: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
};

const requirementOverwrites = {
  classMethod: {
    kind: "default: `method`",
  },
  program: {
    sourceType: "default: `'script'`",
  },
  regExpLiteral: {
    flags: 'default: `""`',
  },
  tsDeclareMethod: {
    kind: "default: `'method'`",
  },
};

const getRequirement = (required, id, type, types) => {
  if (
    requirementOverwrites.hasOwnProperty(type) &&
    requirementOverwrites[type].hasOwnProperty(id)
  ) {
    return requirementOverwrites[type][id];
  }

  if (required) {
    return "required";
  }

  if (types.slice(0, "`Array<".length) === "`Array<") {
    return "default: `[]`";
  }

  switch (types) {
    case "`boolean`":
      return "default: `false`";

    case "`string`":
      return 'default: `""`';

    default:
      return "default: `null`";
  }
};

const typeToDoc = type => line => {
  const match = line.match(callRegex);
  const id = match[1].slice(0, 1) === "_" ? match[1].slice(1) : match[1];
  const required = match[2] === ":";
  const types =
    typeOverwrites.hasOwnProperty(type) &&
    typeOverwrites[type].hasOwnProperty(id)
      ? typeOverwrites[type][id]
      : "`" + removeNullUndefined(match[3]) + "`";
  return ` - \`${id}\`: ${types} (${getRequirement(
    required,
    id,
    type,
    types
  )})`;
};

const seeAlso = type => {
  const see = { assert: "", is: "" };
  const is = String(`is${type}`).toLowerCase();
  const assert = String(`assert${type}`).toLocaleLowerCase();
  for (const type in t) {
    if (type.toLowerCase() === assert) {
      see.assert = type;
    }
    if (type.toLowerCase() === is) {
      see.is = type;
    }
  }
  return `See also \`t.${see.is}(node, opts)\` and \`t.${
    see.assert
  }(node, opts)\`.`;
};

const findAliases = typeDefLines => {
  const aliasBlock = [];
  let collect = false;
  for (const line of typeDefLines) {
    if (line === "export interface Aliases {") {
      collect = true;
    } else if (collect && line === "}") {
      collect = false;
    } else if (collect) {
      const parts = line.split(":");
      aliasBlock.push(parts[0].trim());
    }
  }
  const aliases = {};
  aliasBlock.forEach(alias => {
    const types = typeDefLines.filter(l =>
      new RegExp(`^export type ${alias} = `).test(l)
    );
    const names = types[0]
      .slice(`export type ${alias} = `.length)
      .split(" | ")
      .map(s => (s.slice(-1) === ";" ? s.slice(0, -1) : s));
    for (const name of names) {
      if (aliases.hasOwnProperty(name)) {
        aliases[name].push(alias);
      } else {
        aliases[name] = [alias];
      }
    }
  });
  for (const key in aliases) {
    aliases[key].sort((a, b) => a.localeCompare(b));
  }
  return aliases;
};

const getArgumentsAndReturnType = def => {
  const match = def.match(signatureRegex);
  if (match && match[1] && match[2]) {
    return [match[1].split(",").map(s => String(s).trim()), match[2]];
  } else if (def.includes("()")) {
    const r = def.match(typeRegex);
    if (r && r[1]) {
      return [[], r[1]];
    }
  }
  return [[], "unknown"];
};

(async () => {
  const typeDefs = await readfile(
    path.resolve(
      __dirname,
      "node_modules",
      "@babel",
      "types",
      "lib",
      "index.d.ts"
    ),
    "utf-8"
  );
  const typeDefLines = typeDefs.split("\n");
  const aliases = findAliases(typeDefLines);
  const sections = [];

  for (const type in t) {
    const isBuilder = /_builder\.default/.test(t[type].toString());
    if (!isBuilder) {
      continue;
    }

    const findFunction = typeDefLines.filter(l =>
      new RegExp(`^export function ${type}\\(`).test(l)
    );

    if (findFunction.length === 0) {
      continue;
    }

    const section = {
      aliases: ["Aliases: none", ""],
      args: [],
      header: [`### ${type}`], // [`### ${type}`, ""],
      returnType: "unknown",
      seeAlso: [seeAlso(type), ""],
      signature: [],
      type,
    };

    const [args, returnType] = getArgumentsAndReturnType(findFunction[0]);
    section.args = args.length ? args.map(typeToDoc(type)).concat([""]) : [];
    section.signature = signature(type, args, returnType);
    section.returnType = returnType;
    if (aliases.hasOwnProperty(section.returnType)) {
      section.aliases = [
        `Aliases: \`${aliases[section.returnType].join("`, `")}\``,
        "",
      ];
    }
    sections.push(section);
    seeAlso(type);
  }

  const argv = Array.from(process.argv).slice(2);
  const overWriteId = argv
    .filter(arg => /^--babel-types-id=/.test(arg))
    .map(arg => arg.split("=")[1])[0];

  const content = [
    "---",
    `id: ${overWriteId ? overWriteId : "babel-types"}`,
    "title: @babel/types",
    "sidebar_label: types",
  ]
    .concat(overWriteId ? ["original_id: babel-types"] : [])
    .concat([
      "---",
      "",
      "## Install",
      "",
      "```sh",
      "npm install --save-dev @babel/types",
      "```",
      "",
      "## API",
      "",
    ])
    .concat(
      sections
        .sort((a, b) => a.type.localeCompare(b.type))
        .reduce(
          (acc, cur) =>
            acc.concat(
              cur.header
                .concat(cur.signature)
                .concat(cur.seeAlso)
                .concat(cur.aliases)
                .concat(cur.args)
                .concat(["---", ""])
            ),
          []
        )
    );

  await writefile(path.resolve(__dirname, "types.md"), content.join("\n"));
})();
