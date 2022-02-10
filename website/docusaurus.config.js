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
const toolsMD = findMarkDownSync("./data/tools/");

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

const sponsorsManual = (loadYaml("./data/sponsors.yml") || []).map(sponsor => ({
  ...sponsor,
  image: sponsor.image || path.join("/img/sponsors/", sponsor.logo),
}));
const sponsorsDownloaded = require(path.join(__dirname, "/data/sponsors.json"));

const sponsors = [
  ...sponsorsDownloaded
    .filter(sponsor => sponsor.slug !== "github-sponsors")
    .map(sponsor => {
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
        tier: sponsor.tier,
        name: sponsor.name,
        url: website,
        image: sponsor.avatar || "/img/user.svg",
        description: sponsor.description,
        monthly: sponsor.monthlyDonations,
        yearly: sponsor.yearlyDonations,
        total: sponsor.totalDonations,
      };
    }),
  ...sponsorsManual,
];

// move to website/data later
const videos = require(path.join(__dirname, "/data/videos.js"));
const team = loadYaml("./data/team.yml");
const tools = loadYaml("./data/tools.yml");
const setupBabelrc = loadMD("./data/tools/setup.md");

toolsMD.forEach(tool => {
  tool.install = loadMD(`${tool.path}/install.md`);
  tool.usage = loadMD(`${tool.path}/usage.md`);
});

const DEFAULT_LANGUAGE = "en";

const GITHUB_URL = "https://github.com/babel/website";

const siteConfig = {
  titleDelimiter: "·",
  baseUrl: "/",
  favicon: "img/favicon.png",
  onBrokenLinks: "ignore", // enable once everything works fine
  customFields: {
    repoUrl: "https://github.com/babel/babel",
    organizationName: "babel",
    projectName: "babel",
    baseUrl: "/",
    // getDocUrl: (doc, language) =>
    //   `/docs/${language || DEFAULT_LANGUAGE}/${doc}`,
    // getPageUrl: (page, language) => `/${language || DEFAULT_LANGUAGE}/${page}`,
    // getVideoUrl: (videos, language) =>
    //   `/${language || DEFAULT_LANGUAGE}/${videos}`,
    blogSidebarCount: "ALL",
    users,
    sponsors,
    videos,
    team,
    tools,
    toolsMD,
    setupBabelrc,
  },
  // useEnglishUrl: true, not needed
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        docs: {
          editUrl: `https://github.com/babel/website`,
          // Docs folder path relative to website dir.
          path: "../docs",
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve("./sidebars.json"),

          // headerIcon: "img/babel.svg",
          // footerIcon: "img/babel.svg",
          // favicon: "img/favicon.png",
          // ogImage: "img/ogImage.png",
          // colors: {
          //   primaryColor: "#323330",
          //   secondaryColor: "#323330",
          // },
          // blogSidebarCount: "ALL",

          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        // ...
      },
    ],
  ],
  themeConfig: {
    onPageNav: "separate",
    gaTrackingId: "UA-114990275-1",
    siteConfig: {
      headerIcon: "img/babel.svg",
      disableHeaderTitle: true,
      footerIcon: "img/babel.svg",
      ogImage: "img/ogImage.png",
      colors: {
        primaryColor: "#323330",
        secondaryColor: "#323330",
      },
      highlight: {
        theme: "tomorrow",
        hljs: hljs => {
          hljs.registerLanguage("json5", hljs =>
            hljs.getLanguage("javascript")
          );
        },
      },
    },
    algolia: {
      apiKey: "d42906b043c5422ea07b44fd49c40a0d",
      indexName: "babeljs",
    },
    navbar: {
      logo: {
        alt: "Babel logo",
        src: "img/babel.svg", //revisit
      },
      items: [
        { to: "docs/", label: "Docs", position: "right" },
        // { to: "setup", label: "Setup", position: "right" },
        // { to: "repl", label: "Try it out", position: "right" },
        { to: "videos/", label: "Videos", position: "right" },

        { to: "blog", label: "Blog", position: "right" },
        {
          type: "search",
          position: "right",
        },
        {
          href: "https://opencollective.com/babel",
          label: "Donate",
          position: "right",
        },
        { to: "team", label: "Team", position: "right" },
        {
          href: "https://github.com/babel/babel",
          label: "GitHub",
          position: "right",
        },
      ],
    },
  },
  // editUrl: `https://github.com/babel/website`,
  title: "Babel",
  tagline: "The compiler for next generation JavaScript",
  url: "https://babeljs.io",
  // v6Url: "https://v6.babeljs.io/docs/setup/", not valid but needed
  // getDocUrl: (doc, language) =>
  //   `${siteConfig.baseUrl}docs/${language || DEFAULT_LANGUAGE}/${doc}`,
  // getPageUrl: (page, language) =>
  //   `${siteConfig.baseUrl}${language || DEFAULT_LANGUAGE}/${page}`,
  // getVideoUrl: (videos, language) =>
  //   `${siteConfig.baseUrl}${language || DEFAULT_LANGUAGE}/${videos}`,
  // headerLinks: [
  //   { doc: "index", label: "Docs" },
  //   { page: "setup", label: "Setup" },
  //   { page: "repl", label: "Try it out" },
  //   { page: "videos", label: "Videos" },
  //   { blog: true, label: "Blog" },
  //   { search: true },
  //   { href: "https://opencollective.com/babel", label: "Donate" },
  //   { page: "team", label: "Team" },
  //   { href: "https://github.com/babel/babel", label: "GitHub" },
  //   // { languages: true }
  // ],
  // users,
  // sponsors,
  // videos,
  // team,
  // tools,
  // toolsMD,
  // setupBabelrc,
  // headerIcon: "img/babel.svg",
  // footerIcon: "img/babel.svg",
  // favicon: "img/favicon.png",
  // ogImage: "img/ogImage.png",
  // colors: {
  //   primaryColor: "#323330",
  //   secondaryColor: "#323330",
  // },
  // blogSidebarCount: "ALL",
  // highlight: {
  //   theme: "tomorrow",
  //   hljs: hljs => {
  //     hljs.registerLanguage("json5", hljs => hljs.getLanguage("javascript"));
  //   },
  // },
  scripts: [
    {
      src: "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
      defer: true,
    },
    {
      src: "https://unpkg.com/@babel/standalone@^7.0.0/babel.min.js",
      defer: true,
    },
    {
      src: "https://unpkg.com/ace-builds@1.3.3/src-min-noconflict/ace.js",
      defer: true,
    },
    {
      src: "https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js",
      defer: true,
    },
    {
      src: "/js/code-blocks-buttons.js",
      defer: true,
    },
    {
      src: "/scripts/repl-page-hacks.js",
      defer: true,
    },
  ],
  // stylesheets: [ "" ],
  // translationRecruitingLink: "https://crowdin.com/project/",
  // disableHeaderTitle: true,
  // onPageNav: "separate",
  // gaTrackingId: "UA-114990275-1",
  // cleanUrl: true,
  // These two options make the build insanely slow
  // enableUpdateBy: false,
  // enableUpdateTime: false,
  // ----
  // scrollToTop: true, deprecated
  // markdownPlugins: [],
  // cname,
  // docsSideNavCollapsible: true,
};

module.exports = siteConfig;
