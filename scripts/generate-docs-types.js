const fs = require("fs").promises;
const path = require("path");
const { generateDocTypesExample } = require("./generate-docs-types-example");

const argv = Array.from(process.argv).slice(2);
const grabAgument = rgx =>
  argv.filter(arg => rgx.test(arg)).map(arg => arg.split("=")[1])[0];

const typesArg = grabAgument(/^--types=/);

let t = require("@babel/types");

if (typesArg) {
  try {
    t = require(typesArg);
  } catch (error) {
    console.log(`unable to get --types=${typesArg}`);
    console.log(error);
    process.exit(1);
  }
}

if (!Object.hasOwnProperty.call(t, "noop")) {
  console.log("unable to load types");
  process.exit(1);
}

const callRegex = /(\w+)(\??:)\s(.+)/;
const signatureRegex = /\((.*)\):\s(\w+)/i;
const typeRegex = /:\s(\w+);$/i;

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
  return ["```javascript", `t.${type}(${required})`, "```", ""];
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

const getFirstType = input => {
  let types = input;
  if (input.slice(0, 1) === "`" && input.slice(-1) === "`") {
    types = input.slice(1, -1);
  }
  return types.split("|")[0].trim();
};

const idMetaTypes = type => argLine => {
  const match = argLine.match(callRegex);
  const id = match[1].slice(0, 1) === "_" ? match[1].slice(1) : match[1];
  const required = match[2] === ":";
  const types =
    typeOverwrites.hasOwnProperty(type) &&
    typeOverwrites[type].hasOwnProperty(id)
      ? typeOverwrites[type][id]
      : "`" + removeNullUndefined(match[3]) + "`";
  return {
    id,
    meta: getRequirement(required, id, type, types),
    type: getFirstType(types),
    types: types,
  };
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
  const typeDefs = await fs.readFile(
    typesArg
      ? path.resolve(__dirname, "..", typesArg)
      : path.resolve(
          __dirname,
          "..",
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

    if (findFunction.length === 0 && (type === "import" || type === "super")) {
      findFunction.push(
        `export function ${type}(): ${type
          .slice(0, 1)
          .toUpperCase()}${type.slice(1)};`
      );
    }

    if (findFunction.length === 0) {
      continue;
    }

    const section = {
      aliases: ["Aliases: none", ""],
      args: [],
      example: "",
      header: [`### ${type}`],
      returnType: "unknown",
      seeAlso: [seeAlso(type), ""],
      signature: [],
      type,
    };

    const [args, returnType] = getArgumentsAndReturnType(findFunction[0]);

    if (returnType) {
      section.header = [`### ${returnType}`];
    }

    const params = args.length ? args.map(idMetaTypes(type)) : [];
    section.args = params.length
      ? params
          .map(({ id, meta, types }) => ` - \`${id}\`: ${types} (${meta})`)
          .concat([""])
      : [];
    section.signature = signature(type, args, returnType);
    section.returnType = returnType;
    if (aliases.hasOwnProperty(section.returnType)) {
      section.aliases = [
        `Aliases: \`${aliases[section.returnType].join("`, `")}\``,
        "",
      ];
    }
    const example = generateDocTypesExample(
      section.signature[1],
      returnType,
      params
    );
    section.example = example ? ["```javascript", example, "```", ""] : [];
    sections.push(section);
    seeAlso(type);
  }

  const overWriteId = grabAgument(/^--babel-types-id=/);

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
                .concat(cur.example)
                .concat(["---", ""])
            ),
          []
        )
    );

  await fs.writeFile(
    path.resolve(__dirname, "..", "docs", "types.md"),
    content.join("\n")
  );
})();
