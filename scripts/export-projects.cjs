const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");

const file = path.resolve("lib/projects.ts");
const source = fs.readFileSync(file, "utf8");
const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

let projects;

function visit(node) {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.getText(ast) === "projects" &&
    node.initializer &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    projects = node.initializer.elements.map((element) => {
      const result = ts.getParsedCommandLineOfConfigFile;
      const text = element.getText(ast);

      const wrapped = ts.createSourceFile(
        "project.ts",
        `const project = ${text};`,
        ts.ScriptTarget.Latest,
        true,
      );

      const declaration = wrapped.statements.find(ts.isVariableStatement);
      const initializer = declaration.declarationList.declarations[0].initializer;

      function evaluate(node) {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
          return node.text;
        }
        if (ts.isArrayLiteralExpression(node)) {
          return node.elements.map(evaluate);
        }
        if (ts.isObjectLiteralExpression(node)) {
          return Object.fromEntries(node.properties.map((property) => [
            property.name.getText(wrapped).replace(/^["']|["']$/g, ""),
            evaluate(property.initializer),
          ]));
        }
        throw new Error(`Unsupported project value: ${node.getText(wrapped)}`);
      }

      return evaluate(initializer);
    });
  }
  ts.forEachChild(node, visit);
}

visit(ast);

if (!projects || projects.length !== 6) {
  throw new Error(`Expected six projects, found ${projects?.length ?? 0}.`);
}

const output = path.resolve("scripts/projects-seed.json");
fs.writeFileSync(output, JSON.stringify(projects, null, 2) + "\n");

console.log(`Exported ${projects.length} projects to scripts/projects-seed.json`);
for (const project of projects) {
  console.log(`- ${project.title} (${project.slug})`);
}
