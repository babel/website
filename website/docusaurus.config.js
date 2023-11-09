const parseYaml = require("js-yaml").load;
const path = require("path");
const fs = require("fs");
const url = require("url");

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return value && value !== "false" && value !== "0";
}

function findMarkDownSync(startPath) {
  const result = [];
  const files = fs.readdirSync(path.join(__dirname, startPath), {
    withFileTypes: true,
  });
  files.forEach((dirent) => {
    if (dirent.isDirectory()) {
      result.push({
        title: dirent.name,
        path: path.join(startPath, dirent.name),
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

const videos = require(path.join(__dirname, "/data/videos.js"));
const team = loadYaml("./data/team.yml");
const tools = loadYaml("./data/tools.yml");
const setupBabelrc = loadMD("./data/tools/setup.md");

toolsMD.forEach(tool => {
  tool.install = loadMD(`${tool.path}/install.md`);
  tool.usage = loadMD(`${tool.path}/usage.md`);
});

/**
 * A remark plugin that renders markdown contents within `:::babel8` and the nearest matching `:::` based on the
 * BABEL_8_BREAKING option. When `BABEL_8_BREAKING` is `true`, contents within `:::babel7` and `:::` will be removed,
 * otherwise everything within `:::babel8` and `:::` is removed.
 *
 * Limit: there must be an empty line before and after `:::babel[78]` and `:::`.
 *
 * With this plugin we can maintain both Babel 7 and Babel 8 docs in the same branch.
 * @param {{BABEL_8_BREAKING: boolean}} options
 * @returns md-ast transformer
 */
function remarkDirectiveBabel8Plugin({ renderBabel8 }) {
  return function transformer(root) {
    const children = root.children;
    const deleteBatches = [];
    for (let index = 0; index < children.length; index++) {
      const node = children[index];
      if (node.type === "admonitionHTML") { // for support inside ::tip, etc
        transformer(node);
      } else if (node.type !== "paragraph") {
        continue;
      }
      const directiveLabel = node.children?.[0].value;
      if (directiveLabel === ":::babel8" || directiveLabel === ":::babel7") {
        let containerEnd = index + 1,
          nestedLevel = 1;
        for (; containerEnd < children.length; containerEnd++) {
          const node = children[containerEnd];
          if (node.type === "paragraph") {
            const directiveLabel = node.children?.[0].value;
            if (directiveLabel?.startsWith(":::")) {
              if (directiveLabel.length === 3) {
                nestedLevel--;
                if (nestedLevel === 0) {
                  break;
                }
              } else {
                nestedLevel++;
              }
            }
          }
        }
        if (nestedLevel === 0) {
          if ((directiveLabel === ":::babel8") ^ renderBabel8) {
            deleteBatches.push([index, containerEnd - index + 1]); // remove anything between ":::babel[78]" and ":::"
          } else {
            deleteBatches.push([index, 1], [containerEnd, 1]); // remove ":::babel[78]" and ":::"
          }
          index = containerEnd;
        } else {
          throw new Error(
            ":::babel[78] directive is not matched with ending :::"
          );
        }
      }
    }
    for (let index = deleteBatches.length - 1; index >= 0; index--) {
      const [start, deleteCount] = deleteBatches[index];
      children.splice(start, deleteCount);
    }
  };
}

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
          sidebarPath: require.resolve("./sidebars.js"),

          showLastUpdateAuthor: false,
          showLastUpdateTime: false,

          beforeDefaultRemarkPlugins: [
            [
              remarkDirectiveBabel8Plugin,
              { renderBabel8: bool(process.env.BABEL_8_BREAKING) },
            ],
          ],
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
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ["flow", "powershell"],
      theme: require("./src/theme/prism/light"),
      darkTheme: require("./src/theme/prism/dark"),
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "highlight-error-next-line",
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
