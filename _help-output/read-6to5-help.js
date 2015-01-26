import child_process from 'child_process';
let exec = child_process.exec;

const HELP_SECTION_NAMES = [
  'usage',
  'options',
  'transformers',
  'module formatters'
];

export default function readHelp(done) {
  exec('6to5 --help', (err, stdout) => {
    if (err) return done(err, null);

    let parsedOutput;

    try { parsedOutput = parseHelpOutput(stdout, HELP_SECTION_NAMES); }
    catch (ex) { return done(ex, null); }

    done(null, parsedOutput);
  });
}

function parseHelpOutput(output, sectionNames) {
  let parsed = {};
  sectionNames.forEach(name => parsed[camelizeHelpSectionName(name)] = []);

  let currSection = null;

  output
    .split('\n')
    .map(line => line.trim())
    .filter(line => !(/^\s*$/).test(line))
    .forEach(line => {
      let sectionName = getHelpSectionName(line, sectionNames);
      if (sectionName) {
        currSection = sectionName;
        return;
      }

      if (currSection) {
        parsed[camelizeHelpSectionName(currSection)]
          .push(createHelpSectionEntry(line));
      }
    });

  return parsed;
}

function getHelpSectionName(line, sectionNames) {
  for (let i = 0, l = sectionNames.length; i < l; ++i) {
    if ((new RegExp(`^${sectionNames[i]}:`, 'i')).test(line)) {
      return sectionNames[i];
    }
  }
}

function camelizeHelpSectionName(sectionName) {
  return sectionName.replace(/[-_\s]+(.)?/g, (match, c) => {
    return c ? c.toUpperCase() : '';
  });
}

function createHelpSectionEntry(line) {
  line = line
    .replace(/^-\s/, '')
    .replace(/^-[a-zA-Z],\s/, '')
    .replace(/^--/, '');

  let lineParts = line.split(/\s{2,}/);
  let entryParts = [...lineParts[0].split(' ')];
  if (lineParts.length > 1) entryParts.push(lineParts[1]);

  let tmpName = entryParts.shift();
  let argName = entryParts.length > 1
    ? entryParts.shift().replace(/^\[/, '').replace(/\]$/, '')
    : null;
  let desc = entryParts.length ? entryParts.shift() : null;
  let name = tmpName.replace(/^\[/, '').replace(/\]$/, '');
  let isOptional = name != tmpName;

  let entry = { name };
  if (argName) entry.argName = argName;
  if (desc) entry.desc = desc;
  if (isOptional) entry.isOptional = isOptional;

  return entry;
}
