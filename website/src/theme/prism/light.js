"use strict";

// Converted from
// https://github.com/highlightjs/highlight.js/blob/11.7.0/src/styles/base16/tomorrow.css

/*
base00  #ffffff  Default Background
base01  #e0e0e0  Lighter Background (Used for status bars, line number and folding marks)
base02  #d6d6d6  Selection Background
base03  #8e908c  Comments, Invisibles, Line Highlighting
base04  #969896  Dark Foreground (Used for status bars)
base05  #4d4d4c  Default Foreground, Caret, Delimiters, Operators
base06  #282a2e  Light Foreground (Not often used)
base07  #1d1f21  Light Background (Not often used)
base08  #c82829  Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
base09  #f5871f  Integers, Boolean, Constants, XML Attributes, Markup Link Url
base0A  #eab700  Classes, Markup Bold, Search Text Background
base0B  #718c00  Strings, Inherited Class, Markup Code, Diff Inserted
base0C  #3e999f  Support, Regular Expressions, Escape Characters, Markup Quotes
base0D  #4271ae  Functions, Methods, Attribute IDs, Headings
base0E  #8959a8  Keywords, Storage, Selector, Markup Italic, Diff Changed
base0F  #a3685a  Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
*/

var theme = {
  plain: {
    color: "#4d4d4c",
    backgroundColor: "#fdfaeb", // customized for Babel theme color
  },
  styles: [
    {
      types: ["comment", "block-comment", "prolog"],
      style: {
        color: "#8e908c",
      },
    },
    {
      types: ["variable", "tag", "deleted"],
      style: {
        color: "#c82829",
      },
    },
    {
      types: [
        "number",
        "boolean",
        "builtin",
        "constant",
        "attr-value",
        "url",
        "parameter",
      ],
      style: {
        color: "#f5871f",
      },
    },
    {
      types: ["class-name", "bold"],
      style: {
        color: "#eab700",
      },
    },
    {
      types: ["string", "char", "inserted"],
      style: {
        color: "#718c00",
      },
    },
    {
      types: ["regex", "entity"],
      style: {
        color: "#3e999f",
      },
    },
    {
      types: ["function", "method", "attr-name"],
      style: {
        color: "#4271ae",
      },
    },
    {
      types: ["keyword", "selector", "italic", "important", "changed"],
      style: {
        color: "#8959a8",
      },
    },
    {
      types: ["doctype"],
      style: {
        color: "#a3685a",
      },
    },
  ],
};

module.exports = theme;
