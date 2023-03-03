"use strict";

// Converted from
// https://github.com/highlightjs/highlight.js/blob/11.7.0/src/styles/base16/tomorrow-night.css

/*
base00  #2d2d2d  Default Background
base01  #393939  Lighter Background (Used for status bars, line number and folding marks)
base02  #515151  Selection Background
base03  #999999  Comments, Invisibles, Line Highlighting
base04  #b4b7b4  Dark Foreground (Used for status bars)
base05  #cccccc  Default Foreground, Caret, Delimiters, Operators
base06  #e0e0e0  Light Foreground (Not often used)
base07  #ffffff  Light Background (Not often used)
base08  #f2777a  Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
base09  #f99157  Integers, Boolean, Constants, XML Attributes, Markup Link Url
base0A  #ffcc66  Classes, Markup Bold, Search Text Background
base0B  #99cc99  Strings, Inherited Class, Markup Code, Diff Inserted
base0C  #66cccc  Support, Regular Expressions, Escape Characters, Markup Quotes
base0D  #6699cc  Functions, Methods, Attribute IDs, Headings
base0E  #cc99cc  Keywords, Storage, Selector, Markup Italic, Diff Changed
base0F  #a3685a  Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
*/

var theme = {
  plain: {
    color: "#cccccc",
    backgroundColor: "#2d2d2d",
  },
  styles: [
    {
      types: ["comment", "block-comment", "prolog"],
      style: {
        color: "#999999",
      },
    },
    {
      types: ["variable", "tag", "deleted"],
      style: {
        color: "#f2777a",
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
        color: "#f99157",
      },
    },
    {
      types: ["class-name", "bold"],
      style: {
        color: "#ffcc66",
      },
    },
    {
      types: ["string", "char", "inserted"],
      style: {
        color: "#99cc99",
      },
    },
    {
      types: ["regex", "entity"],
      style: {
        color: "#66cccc",
      },
    },
    {
      types: ["function", "method", "attr-name"],
      style: {
        color: "#6699cc",
      },
    },
    {
      types: ["keyword", "selector", "italic", "important", "changed"],
      style: {
        color: "#cc99cc",
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
