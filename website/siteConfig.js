const parseYaml = require("js-yaml").safeLoad;
const path = require("path");
const fs = require("fs");

function findMarkDownSync(startPath) {
  const result = [];
  const files = fs.readdirSync(path.join(__dirname, startPath));
  files.forEach((val, index) => {
    const fPath = path.join(startPath, val);
    const stats = fs.statSync(fPath);
    if (stats.isDirectory()) {
      result.push({
        title: val,
        path: fPath,
      });
    }
  });
  return result;
}
const toolsMD = findMarkDownSync("../docs/tools/");

function loadMD(fsPath) {
  return fs.readFileSync(path.join(__dirname, fsPath), "utf8");
}

function loadYaml(fsPath) {
  return parseYaml(fs.readFileSync(path.join(__dirname, fsPath), "utf8"));
}
// move to website/data later
const users = loadYaml("./data/users.yml").map(user => ({
  pinned: user.pinned,
  caption: user.name,
  infoLink: user.url,
  image: `/img/users/${user.logo}`,
}));

// move to website/data later
const videos = loadYaml("./data/videos.yml");
const team = loadYaml("./data/team.yml");
const tools = loadYaml("./data/tools.yml");
const setupBabelrc = loadMD("../docs/tools/setup.md");

toolsMD.forEach(tool => {
  tool.install = loadMD(`${tool.path}/install.md`);
  tool.usage = loadMD(`${tool.path}/usage.md`);
});

const GITHUB_URL = "https://github.com/babel/website";

const siteConfig = {
  useEnglishUrl: true,
  editUrl: `${GITHUB_URL}/blob/master/docs/`,
  title: "Babel",
  tagline: "The compiler for next generation JavaScript",
  url: "https://babeljs.io",
  baseUrl: "/",
  organizationName: "babel",
  projectName: "babel",
  repoUrl: "https://github.com/babel/babel",
  headerLinks: [
    { doc: "index", label: "Docs" },
    { page: "setup", label: "Setup" },
    { page: "repl", label: "Try it out" },
    { blog: true, label: "Blog" },
    { search: true },
    { href: "https://opencollective.com/babel", label: "Donate" },
    { page: "team", label: "Team" },
    { href: "https://github.com/babel/babel", label: "GitHub" },
    // { languages: true }
  ],
  users,
  videos,
  team,
  tools,
  toolsMD,
  setupBabelrc,
  headerIcon: "img/babel-black.svg",
  footerIcon: "img/babel.svg",
  favicon: "img/favicon.png",
  colors: {
    primaryColor: "#323330",
    secondaryColor: "#323330",
  },
  highlight: {
    theme: "tomorrow",
  },
  // scripts: ["https://buttons.github.io/buttons.js"],
  // stylesheets: [ "" ],
  // translationRecruitingLink: "https://crowdin.com/project/",
  algolia: {
    apiKey: "d42906b043c5422ea07b44fd49c40a0d",
    indexName: "babeljs",
  },
  disableHeaderTitle: true,
  // gaTrackingId: "U-",
  // markdownPlugins: [],
  // cname
};

module.exports = siteConfig;
