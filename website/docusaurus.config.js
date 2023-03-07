const parseYaml = require("js-yaml").load;
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

const siteConfig = {
  titleDelimiter: "·",
  baseUrl: "/",
  favicon: "img/favicon.png",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  customFields: {
    repoUrl: "https://github.com/babel/babel",
    v6Url: "https://v6.babeljs.io/docs/setup/",
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
        pages: {
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
        docs: {
          editUrl: "https://github.com/babel/website/edit/main/docs",

          // Docs folder path relative to website dir.
          path: "../docs",
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve("./sidebars.json"),

          showLastUpdateAuthor: false,
          showLastUpdateTime: false,

          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        blog: {
          blogSidebarTitle: "All Blog Posts",
          blogSidebarCount: "ALL",
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
        // ...
      },
    ],
  ],
  themeConfig: {
    onPageNav: "separate",
    gaTrackingId: "UA-114990275-1",
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      additionalLanguages: ["powershell"],
      theme: require("./src/theme/prism/light"),
      darkTheme: require("./src/theme/prism/dark"),
      magicComments: [
        {
          className: "code-block-error-line",
          line: "@codeblock-error-next-line",
        },
      ],
    },
    siteConfig: {
      headerIcon: "img/babel.svg",
      disableHeaderTitle: true,
      footerIcon: "img/babel.svg",
      ogImage: "img/ogImage.png",
      colors: {
        primaryColor: "#f5da55",
        secondaryColor: "#323330",
      },
    },
    algolia: {
      appId: "M7KGJDK6WF",
      apiKey: "6ec7d6acbfb6ed3520846a7517533c28",
      indexName: "babeljs",
      contextualSearch: false,
    },
    navbar: {
      logo: {
        alt: "Babel logo",
        src: "img/babel.svg", //revisit
      },
      items: [
        { to: "docs/", label: "Docs", position: "right" },
        { to: "setup", label: "Setup", position: "right" },
        {
          target: "_top",
          href:
            process.env.ENV === "development"
              ? "http://localhost:3000/repl"
              : `/repl`,
          label: "Try it out",
          position: "right",
        },
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
  title: "Babel",
  tagline: "The compiler for next generation JavaScript",
  url: "https://babeljs.io",

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
    {
      src: "/js/components/mini-repl.js",
      type: "module",
    },
    {
      src: "/js/components/assumption-repl.js",
      type: "module",
    },
  ],
};

module.exports = siteConfig;
