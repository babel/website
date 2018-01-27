const parseYaml = require("js-yaml").safeLoad;
const path = require("path");
const fs = require("fs");

function loadYaml(fsPath) {
  return parseYaml(fs.readFileSync(path.join(__dirname, fsPath), "utf8"));
}
// move to website/data later
const users = loadYaml("../_data/users.yml").map(user => ({
  pinned: user.pinned,
  caption: user.name,
  infoLink: user.url,
  image: `/img/users/${user.logo}`,
}));

// move to website/data later
const videos = loadYaml("./data/videos.yml");
const team = loadYaml("./data/team.yml");

const GITHUB_URL = "https://github.com/babel/website";

const siteConfig = {
  // temporary while transitioning
  customDocsPath: "docs-v7",
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
    { href: "https://opencollective.com/babel", label: "Donate" },
    { doc: "learn", label: "Learn" },
    { blog: true, label: "Blog" },
    { search: true },
    { href: "https://github.com/babel/babel", label: "GitHub" },
    // { languages: true }
  ],
  users,
  videos,
  team,
  headerIcon: "img/babel-black.svg",
  footerIcon: "img/babel.svg",
  favicon: "img/favicon.png",
  colors: {
    primaryColor: "#323330",
    secondaryColor: "#323330",
  },
  highlight: {
    theme: "default",
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
