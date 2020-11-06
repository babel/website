const prettier = require("prettier");

const generateDocTypesExample = (helper, helperName, params) => {
  const log = new Log(["> HELPER", helper, "", "> PARAMS", params]);

  const requiredParams = params
    .reduce((acc, cur, index, arr) => {
      try {
        if (
          (cur && cur.meta === "required") ||
          arr.slice(index).some(part => part && part.meta === "required")
        ) {
          return acc.concat([{ ...cur, meta: "required" }]);
        }
      } catch (error) {
        log.push(cur);
        log.push(error);
      }
      return acc;
    }, [])
    .map(
      part => `const ${part.id} = ${getRightSide({ ...part, helperName })};`
    );

  log.push(["", "> REQUIRED PARAMS", requiredParams]);

  let code = [
    "const generate = require('@babel/generator').default;",
    "const t = require('@babel/types');",
    "",
  ]
    .concat(requiredParams)
    .concat([
      `const ast = ${pickArgs(helper, requiredParams.length)};`,
      "",
      "const {code} = generate(ast);",
      "code;",
    ])
    .map(sanitize);

  log.push([
    "",
    "> CODE",
    prettier.format(code.join("\n"), {
      parser: "babel",
      singleQuote: false,
      trailingComma: "es5",
    }),
  ]);

  let result;
  try {
    result = eval(code.join("\n"));
  } catch (error) {
    log.push([
      `unable to parse code for ${helper}, aborting. error:`,
      error,
      "",
    ]);
    log.write();
    identifiers.reset();
    return "";
  }
  let appendResult = "";
  let blockResult = [];

  if (result.includes("\n")) {
    blockResult = result.split("\n").map(s => `// ${s}`);
  } else {
    appendResult = ` // ${result}`;
  }

  code.pop();
  code.push(`console.log(code);${appendResult}`);
  code = code.concat(blockResult);
  const example = prettier
    .format(code.join("\n"), {
      parser: "babel",
      singleQuote: false,
      trailingComma: "es5",
    })
    .slice(0, -1);

  log.push(["", "> EXAMPLE", example]);
  log.write();
  identifiers.reset();
  return example;
};

const pickArgs = (helper, argCount) => {
  const match = helper.match(/t\.(\w+)\(([\w\s,]+)\)/);
  if (match && match[1] && match[2]) {
    const args = match[2].split(",").map(s => String(s).trim());
    return `t.${match[1]}(${args.slice(0, argCount).join(", ")})`;
  }
  return helper;
};

const getRightSide = ({ helperName, id, meta, type }) => {
  if (meta === "required") {
    return getType(helperName, type, id);
  } else if (/default:\s/.test(meta)) {
    return getType(helperName, meta.slice("default: ".length), id);
  }
};

const getThreeTypes = (helperName, type, id) => {
  const types = [
    getType(helperName, type, id),
    getType(helperName, type, id, 1),
  ];
  if (id === "consequent") {
    types.push(getType(helperName, "BreakStatement"));
  } else {
    types.push(getType(helperName, type, id, 2));
  }
  return inArray(types);
};

const getType = (helperName, type, id, variation = 0) => {
  const isArray = (type || "").match(/^Array<(.+?)>/);

  if (isArray && isArray[1]) {
    return getThreeTypes(helperName, isArray[1], id);
  }

  const types = (type || "")
    .split(" | ")
    .map(s => String(s).trim())
    .filter(s => s);

  switch (types[0]) {
    case "BlockStatement": {
      const a = inArray(getType(helperName, "ReturnStatement", id));
      return `t.blockStatement(${a})`;
    }

    case "BinaryExpression": {
      const a = getType(helperName, "Identifier", id);
      const b = getType(helperName, "NumericLiteral", id);
      return `t.binaryExpression('>', ${a}, ${b})`;
    }

    case "BreakStatement":
      return "t.breakStatement()";

    case "CallExpression": {
      const a = getType(helperName, "Identifier", id);
      const b = getType(helperName, "Identifier", id);
      const c = getType(helperName, "NumericLiteral", id);
      return `t.callExpression(${a}, [${b}, ${c}])`;
    }

    case "ClassBody": {
      const body = inArray(getType(helperName, "ClassMethod", id));
      return `t.classBody(${body})`;
    }

    case "ClassMethod": {
      const key = getType(helperName, "Identifier", id);
      const b = getType(helperName, "Identifier", id);
      const c = getType(helperName, "Identifier", id);
      let body = `t.blockStatement([t.returnStatement(t.binaryExpression('>', ${b}, ${c}))])`;
      let kind = "method";
      switch (variation) {
        case 2: {
          const leftB = `t.memberExpression(t.thisExpression(), ${b})`;
          const assignB = `t.assignmentExpression("=", ${leftB}, ${b})`;
          const leftC = `t.memberExpression(t.thisExpression(), ${c})`;
          const assignC = `t.assignmentExpression("=", ${leftC}, ${c})`;
          body = `t.blockStatement([t.expressionStatement(${assignB}), t.expressionStatement(${assignC})])`;
          kind = "constructor";
          break;
        }
      }
      return `t.classMethod("${kind}", ${key}, ${inArray([b, c])}, ${body})`;
    }

    case "Declaration":
      return getType(helperName, "VariableDeclaration");

    case "DeclaredPredicate": {
      const value = getType(helperName, "Flow", id);
      return `t.declaredPredicate(${value})`;
    }

    case "Decorator": {
      const a = getType(helperName, "Expression", id);
      return `t.decorator(${a})`;
    }

    case "Directive": {
      const value = getType(helperName, "DirectiveLiteral", id);
      return `t.directive(${value})`;
    }

    case "DirectiveLiteral":
      return `t.directiveLiteral("${identifiers.next()}")`;

    case "ExportSpecifier": {
      const local = getType(helperName, "Identifier", id);
      const exported = getType(helperName, "Identifier", id);
      return `t.exportSpecifier(${local}, ${exported})`;
    }

    case "Expression": {
      switch (id) {
        case "object":
          return "t.thisExpression()";

        case "quasis":
          return getType(helperName, "StringLiteral", id);

        default:
          return getType(helperName, "Identifier", id);
      }
    }

    case "Flow":
      return "t.anyTypeAnnotation()";

    case "FlowType":
      switch (variation) {
        case 2:
          return "t.numberTypeAnnotation()";

        case 1:
          return "t.stringTypeAnnotation()";

        default:
          return "t.anyTypeAnnotation()";
      }

    case "FunctionDeclaration": {
      const ident = getType(helperName, "Identifier", id);
      const params = getType(helperName, "Array<LVal>", id);
      const body = getType(helperName, "BlockStatement", id);
      return `t.functionDeclaration(${ident}, ${params}, ${body})`;
    }

    case "FunctionTypeParam": {
      const name = getType(helperName, "Identifier", id);
      const typeAnnotation = getType(helperName, "FlowType", id);
      return `t.functionTypeParam(${name}, ${typeAnnotation})`;
    }

    case "Identifier":
    case "PatternLike":
    case "TSEntityName": {
      const a = identifiers.next();
      return `t.identifier("${a}")`;
    }

    case "ImportSpecifier": {
      const local = getType(helperName, "Identifier", id);
      const imported = getType(helperName, "Identifier", id);
      return `t.importSpecifier(${local}, ${imported})`;
    }

    case "InterfaceExtends": {
      const a = getType(helperName, "Identifier", id);
      return `t.interfaceExtends(${a})`;
    }

    case "JSXAttribute": {
      const name = getType(helperName, "JSXIdentifier", id);
      const value = getType(helperName, "StringLiteral", id);
      return `t.jsxAttribute(${name}, ${value})`;
    }

    case "JSXClosingElement": {
      const name = getType(helperName, "JSXIdentifier", id);
      return `t.jsxClosingElement(${name})`;
    }

    case "JSXClosingFragment":
      return "t.jsxClosingFragment()";

    case "JSXElement": {
      const openingElement = getType(helperName, "JSXOpeningElement", id);
      const closingElement = getType(helperName, "JSXClosingElement", id);
      const children = getType(helperName, "Array<JSXText>", id);
      const selfClosing = true;
      return `t.jsxElement(${openingElement}, ${closingElement}, ${children}, ${selfClosing})`;
    }

    case "JSXIdentifier": {
      const name = identifiers.next();
      return `t.jsxIdentifier("${name}")`;
    }

    case "JSXMemberExpression": {
      const object = getType(helperName, "JSXIdentifier", id);
      const property = getType(helperName, "JSXIdentifier", id);
      return `t.jsxMemberExpression(${object}, ${property})`;
    }

    case "JSXOpeningElement": {
      const name = getType(helperName, "JSXIdentifier", id);
      const attributes = getType(helperName, "Array<JSXAttribute>", id);
      return `t.jsxOpeningElement(${name}, ${attributes})`;
    }

    case "JSXOpeningFragment":
      return "t.jsxOpeningFragment()";

    case "JSXText":
      return `t.jsxText("${identifiers.next()} ")`;

    case "LVal": {
      const left = getType(helperName, "Identifier", id);
      switch (variation) {
        case 2: {
          const right = getType(helperName, "NumericLiteral", id);
          return `t.assignmentPattern(${left}, ${right})`;
        }

        case 1: {
          const right = getType(helperName, "StringLiteral", id);
          return `t.assignmentPattern(${left}, ${right})`;
        }

        default:
          return left;
      }
    }

    case "NumericLiteral":
      return "t.numericLiteral(1337)";

    case "ObjectMethod": {
      const key = getType(helperName, "Identifier", id);
      const params = getType(helperName, "Array<LVal>", id);
      const body = getType(helperName, "BlockStatement", id);
      return `t.objectMethod("method", ${key}, ${params}, ${body})`;
    }

    case "ObjectProperty": {
      const key = getType(helperName, "Identifier", id);
      const value = getType(helperName, "StringLiteral", id);
      return `t.objectProperty(${key}, ${value})`;
    }

    case "ObjectTypeAnnotation": {
      const a = getType(helperName, "ObjectTypeProperty", id);
      return `t.objectTypeAnnotation([${a}])`;
    }

    case "ObjectTypeProperty": {
      const a = getType(helperName, "Identifier", id);
      const b = getType(helperName, "FlowType", id, variation);
      return `t.objectTypeProperty(${a}, ${b})`;
    }

    case "PrivateName": {
      const a = getType(helperName, "Identifier", id);
      return `t.privateName(${a})`;
    }

    case "Program": {
      const body = getType(helperName, "Array<Statement>", id);
      return `t.program(${body})`;
    }

    case "RestElement": {
      const a = getType(helperName, "LVal", id);
      return `t.restElement(${a})`;
    }

    case "ReturnStatement":
      return `t.returnStatement(t.thisExpression())`;

    case "Statement": {
      return getType(helperName, "VariableDeclaration", id);
    }

    case "StringLiteral": {
      const str = identifiers.next();
      return `t.stringLiteral("${str}")`;
    }

    case "SwitchCase": {
      const test = getType(helperName, "StringLiteral", id);
      const consequent = getType(helperName, "Array<Statement>", "consequent");
      return `t.switchCase(${test}, ${consequent})`;
    }

    case "TemplateElement": {
      const value = getType(helperName, "{raw: string, cooked?: string}", id);
      const tail = true;
      return `t.templateElement(${value}, ${tail})`;
    }

    case "TemplateLiteral": {
      const quasis = inArray(getType(helperName, "TemplateElement", id));
      const expressions = getType(helperName, "Array<Expression>", id);
      return `t.templateLiteral(${quasis}, ${expressions})`;
    }

    case "TSConstructSignatureDeclaration": {
      const typeParameters = getType(
        helperName,
        "TSTypeParameterDeclaration",
        id
      );
      const parameters = getType(helperName, "Array<Identifier>", id);
      const typeAnnotation = getType(helperName, "TSTypeAnnotation", id);
      return `t.tsConstructSignatureDeclaration(${typeParameters}, ${parameters}, ${typeAnnotation})`;
    }

    case "TSEnumMember": {
      const a = getType(helperName, "Identifier", id);
      return `t.tsEnumMember(${a})`;
    }

    case "TSExpressionWithTypeArguments": {
      const a = getType(helperName, "TSEntityName", id);
      const b = getType(helperName, "TSTypeParameterInstantiation", id);
      return `t.tsExpressionWithTypeArguments(${a}, ${b})`;
    }

    case "TSInterfaceBody": {
      const a = getType(helperName, "Array<TSTypeElement>", id);
      return `t.tsInterfaceBody(${a})`;
    }

    case "TSModuleBlock": {
      const a = inArray(getType(helperName, "ReturnStatement", id));
      return `t.tsModuleBlock(${a})`;
    }

    case "TSType":
      if (helperName === "tsIndexedAccessType") {
        return getType(helperName, "Identifier", id);
      }
      switch (variation) {
        case 2:
          return "t.tsNumberKeyword()";

        case 1:
          return "t.tsStringKeyword()";

        default:
          return "t.tsAnyKeyword()";
      }

    case "TSTypeAnnotation": {
      const a = getType(helperName, "TSType", id);
      return `t.tsTypeAnnotation(${a})`;
    }

    case "TSTypeElement": {
      const a = inArray(getType(helperName, "Identifier", id));
      return `t.tsIndexSignature(${a})`;
    }

    case "TSTypeParameter": {
      const a = getType(helperName, "TSType", id, variation);
      return `t.tsTypeParameter(${a}, ${a})`;
      // FIXME: use this when https://github.com/babel/babel/issues/10317 is addressed
      // return `t.tsTypeParameter(${a}, ${a}, "${identifiers.next()}")`;
    }

    case "TSTypeParameterDeclaration": {
      const a = getType(helperName, "Array<TSTypeParameter>", id);
      return `t.tsTypeParameterDeclaration(${a})`;
    }

    case "TSTypeParameterInstantiation": {
      const a = getType(helperName, "Array<TSType>");
      return `t.tsTypeParameterInstantiation(${a})`;
    }

    case "TypeAnnotation": {
      const typeAnnotation = getType(helperName, "FlowType", id, variation);
      return `t.typeAnnotation(${typeAnnotation})`;
    }

    case "TypeParameter": {
      const bound = getType(helperName, "TypeAnnotation", id, variation);
      const def = getType(helperName, "FlowType", id, variation);
      const variance = getType(helperName, "Variance", id, variation);
      return `t.typeParameter(${bound}, ${def}, ${variance})`;
    }

    case "TypeParameterDeclaration": {
      const params = getType(helperName, "Array<TypeParameter>", id, variation);
      return `t.typeParameterDeclaration(${params})`;
    }

    case "TypeParameterInstantiation":
      return "t.typeParameterInstantiation([t.anyTypeAnnotation()])";

    case "VariableDeclaration": {
      const a = getType(helperName, "VariableDeclarator", id);
      return `t.variableDeclaration("const", [${a}])`;
    }

    case "VariableDeclarator": {
      const a = getType(helperName, "Identifier", id);
      const b = getType(helperName, "Identifier", id);
      return `t.variableDeclarator(${a}, ${b})`;
    }

    case "Variance": {
      return `t.variance("${variation % 2 === 0 ? "minus" : "plus"}")`;
    }

    case "{raw: string, cooked?: string}":
      return `{ raw: "${identifiers.next()}" }`;

    // primitives

    case "any":
      return `"${identifiers.next()}"`;

    case "boolean":
      return "true";

    case "`'method'`":
      return '"method"';

    case "`null`":
      return "null";

    case "number":
      return 0;

    case "string":
      switch (id) {
        case "operator":
          return '"="';

        case "value":
          return '"0"';

        case "pattern":
          return '"w+"';

        case "name":
          return `"${identifiers.next()}"`;

        default:
          return `string ${id}`;
      }

    case '"++"':
      return '"++"';

    case '"||"':
      return '"||"';

    default:
      switch (id) {
        case "callee":
        case "comments":
        case "key":
        case "property":
        case "tokens":
        case "value": {
          const a = identifiers.next();
          return `t.identifier("${a}")`;
        }

        case "object": {
          const a = identifiers.next();
          const b = identifiers.next();
          return `t.objectExpression([t.objectProperty(t.stringLiteral("${a}"), t.stringLiteral("${b}"))])`;
        }

        case "operator":
          return '"+"';

        case "selfClosing":
          return "false";

        default:
          return types[0] || id;
      }
  }
};

const inArray = elements =>
  Array.isArray(elements) ? `[${elements.join(", ")}]` : `[${elements}]`;

const sanitize = s =>
  s.replace(/\bextends\b/g, "_extends").replace(/\sdefault/g, " _default");

class Log {
  constructor(buffer = []) {
    this.buffer = buffer;
  }

  push(lines) {
    if (Array.isArray(lines)) {
      this.buffer = this.buffer.concat(lines);
    } else {
      this.buffer.push(lines);
    }
  }

  write() {
    for (const line of this.buffer) {
      console.log(line);
    }
  }
}

class Identifier {
  constructor() {
    this.keywords = [
      "foo",
      "bar",
      "baz",
      "qux",
      "quux",
      "corge",
      "grault",
      "garply",
      "waldo",
      "fred",
      "plugh",
      "xyzzy",
      "thud",
    ];
    this.reset();
  }

  next() {
    return this.copy.shift();
  }

  reset() {
    this.copy = Array.from(this.keywords).concat(
      this.keywords
        .map((key, _index, array) => {
          const use = key.slice(0, 1).toUpperCase() + key.slice(1);
          return array
            .map(p => (p === key ? undefined : `${p}${use}`))
            .filter(Boolean);
        })
        .reduce((acc, cur) => acc.concat(cur), [])
    );
  }
}

const identifiers = new Identifier();

module.exports = {
  generateDocTypesExample,
};
