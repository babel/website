"use strict";

const fs = require("fs");
const cheerio = require("cheerio");

const articles = [
  {
    url: "2021/05/10/funding-update",
    title: "Babel is used by millions, so why are we running out of money?",
    description:
      "Since 2018, Babel has been doing a funding experiment: can full time work on Babel be sustained? We’ve learned the answer might be no.",
  },
];

for (const { url, title, description } of articles) {
  const filePath = `${__dirname}/../website/build/babel/blog/${url}.html`;
  const $ = cheerio.load(fs.readFileSync(filePath));

  $("meta[name='twitter:card']").attr("content", "summary_large_image");
  $("meta[property='og:site']").attr("content", "@babeljs");
  $("meta[property='og:title']").attr("content", title);
  $("meta[property='og:description']").attr("content", description);
  $("meta[property='og:image']").attr(
    "content",
    "https://i.imgur.com/tJ9p4uS.png"
  );

  const res = $.root().html();
  fs.writeFileSync(filePath, res);
  fs.writeFileSync(
    `${__dirname}/../website/build/babel/blog/${url}/index.html`,
    res
  );
}
