#!/usr/bin/env 6to5-node

import path from 'path';
import fs from 'fs';
import readHelp from './read-6to5-help';

const BEGIN_MARKER = '// 6to5 Help Output > //';
const END_MARKER = '// < 6to5 Help Output //';
const INDENTATION = '  ';

readHelp((err, output) => {
  if (err) throw err;

  insertHelpOutput(
    JSON.stringify(output),
    BEGIN_MARKER,
    END_MARKER,
    INDENTATION
  );
});

function insertHelpOutput(helpOutput, beginMarker, endMarker, indentation = '') {
  if (typeof process.argv[2] != 'string') {
    throw new Error('Missing file path argument');
  }

  let filePath = path.resolve(process.cwd(), process.argv[2]);

  if (!fs.statSync(filePath).isFile()) {
    throw new Error(`File '${filePath}' does not exist`);
  }

  let content = fs.readFileSync(filePath).toString();

  if (!(new RegExp(beginMarker)).test(content)) {
    throw new Error(`Begin marker "${beginMarker}" not found in '${filePath}'`);
  }

  if (!(new RegExp(endMarker)).test(content)) {
    throw new Error(`End marker "${endMarker}" not found in '${filePath}'`);
  }

  let replacement = [
    beginMarker,
    'var helpOutput = ' + helpOutput + ';',
    endMarker
  ].map((line, idx) => {
    return idx === 0 ? line : (indentation + line);
  }).join('\n');

  content = content.replace(
    new RegExp(`${beginMarker}\[\\s\\S\]*?${endMarker}`, 'm'),
    replacement
  );

  console.info(`Replacing content in '${filePath}'...`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.info(`File '${filePath}' updated`);
}
