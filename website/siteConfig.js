const parseYaml = require("js-yaml").safeLoad;
const path = require("path");
const fs = require("fs");
const url = require("url");

function findMarkDownSync(startPath) {
  const result = [];
  const files = fs.readdirSync(path.join(__dirname, startPath));
  files.forEach(val => {
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

const sponsorsManual = loadYaml("./data/sponsors.yml").map(sponsor => ({
  ...sponsor,
  image: `/img/sponsors/${sponsor.logo}`,
}));
const sponsorsDownloaded = require(path.join(__dirname, "/data/sponsors.json"));

const sponsors = [
  ...sponsorsManual,
  ...sponsorsDownloaded.map(sponsor => {
    // temporary fix for coinbase and webflow
    let tier = sponsor.tier;
    if (sponsor.id == 12671) {
      tier = "gold-sponsors";
    } else if (sponsor.id == 5954) {
      tier = "silver-sponsors";
    }

    let website = sponsor.website;
    if (typeof website == "string") {
      website = url.parse(website).protocol ? website : `http://${website}`;
    } else if (typeof sponsor.twitterHandle == "string") {
      website = `https://twitter.com/@${sponsor.twitterHandle}`;
    } else {
      website = `https://opencollective.com/${sponsor.slug}`;
    }

    return {
      type: "opencollective",
      tier,
      name: sponsor.name,
      url: website,
      image: sponsor.avatar || "/img/user.svg",
      description: sponsor.description,
    };
  }),
];

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
  sponsors,
  videos,
  team,
  tools,
  toolsMD,
  setupBabelrc,
  headerIcon: "img/babel.svg",
  footerIcon: "img/babel.svg",
  favicon: "img/favicon.png",
  colors: {
    primaryColor: "#323330",
    secondaryColor: "#323330",
  },
  highlight: {
    theme: "tomorrow",
  },
  scripts: [
    "https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js",
    "/js/code-blocks-buttons.js",
  ],
  // stylesheets: [ "" ],
  // translationRecruitingLink: "https://crowdin.com/project/",
  algolia: {
    apiKey: "d42906b043c5422ea07b44fd49c40a0d",
    indexName: "babeljs",
  },
  disableHeaderTitle: true,
  onPageNav: "separate",
  gaTrackingId: "UA-114990275-1",
  cleanUrl: true,
  // markdownPlugins: [],
  // cname
};

module.exports = siteConfig;
