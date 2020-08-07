"use strict";

const React = require("react");
const styles = [
  "https://unpkg.com/codemirror@5.56.0/lib/codemirror.css",
  "https://unpkg.com/codemirror@5.56.0/theme/darcula.css",
];

const scripts = [
  "https://unpkg.com/react@16.3.2/umd/react.production.min.js",
  "https://unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js",
  "https://unpkg.com/codemirror@5.56.0/lib/codemirror.js",
  "https://unpkg.com/codemirror@5.56.0/mode/javascript/javascript.js",
  "https://unpkg.com/codemirror@5.56.0/mode/xml/xml.js",
  "https://unpkg.com/codemirror@5.56.0/mode/jsx/jsx.js",
  "https://unpkg.com/codemirror@5.56.0/keymap/sublime.js",
  "https://unpkg.com/codemirror@5.56.0/addon/comment/comment.js",
  "https://unpkg.com/codemirror@5.56.0/addon/display/placeholder.js",
  "https://unpkg.com/codemirror@5.56.0/addon/edit/matchbrackets.js",
  "https://unpkg.com/codemirror@5.56.0/addon/search/searchcursor.js",
  "https://unpkg.com/codemirror@5.56.0/addon/selection/active-line.js",
  "https://unpkg.com/lz-string@1.4.4/libs/base64-string.js",
  "https://unpkg.com/lz-string@1.4.4/libs/lz-string.min.js",
  "/js/build/repl.js",
];

class REPL extends React.Component {
  render() {
    return (
      <div>
        {styles.map(url => (
          <link rel="stylesheet" type="text/css" href={url} key={url} />
        ))}

        <div id="root">
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </div>

        {scripts.map(url => (
          <script src={url} key={url} />
        ))}
      </div>
    );
  }
}

module.exports = REPL;
