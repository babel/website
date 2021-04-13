const React = require("react");
const { MarkdownBlock } = require("docusaurus/lib/core/CompLibrary");

// This components's contents must be written in Markdown, and each line
// must be prefixed with ||| (because JSX discards new lines, so we need a "marker")
const TimelineEvent = ({ date, name, link, children }) => {
  const markdown = React.Children.toArray(children)
    .join("")
    .replace(/\s*\|\|\|/g, "\n");

  return (
    <li
      className="timeline-event"
      style={children ? { paddingBottom: "1em" } : {}}
    >
      <div className="timeline-event-dot">{date}</div>
      <div style={{ width: "100%" }}>
        <span>
          <h3 className="timeline-event-name">
            {link ? <a href={link}>{name}</a> : name}
          </h3>
        </span>
        {children && <MarkdownBlock children={markdown} />}
      </div>
    </li>
  );
};

const Timeline = () =>
  /// prettier messes up with markdown
  /* prettier-ignore */
  <div className="mainContainer">
    <div className="page-header text-center">
      <h1>Features timeline</h1>
    </div>
    <ol className="timeline-container">
      <TimelineEvent name="Babel 7.13.0" date="Feb 2021">
        ||| - Top-level `targets` option ([RFC](https://github.com/babel/rfcs/pull/2))
        ||| - Granular compiler assumptions ([docs](https://babeljs.io/assumptions), [RFC](https://github.com/babel/rfcs/pull/5))
        ||| - Support for the [Records and Tuples](https://github.com/tc39/proposal-record-tuple) proposals
        |||   ```js
        |||   let rec = #{"{"} x: 1 {"}"};
        |||   let tup = #[1, 2, 3];
        |||   ```
        ||| - [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/) support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.12.0" date="Oct 2020">
        ||| - Support for the [class static blocks](https://github.com/tc39/proposal-class-static-block) proposal
        |||   ```js
        |||   class A {"{"}
        |||     static {"{"} initialize(A); {"}"}
        |||   {"}"}
        |||   ```
        ||| - Support for imports and exports string names
        |||   ```js
        |||   let happy = "wooo!";
        |||   export {"{"} happy as "😃" {"}"};
        |||   ```
        ||| - Parser support for the [Import Assertions](https://github.com/tc39/proposal-import-assertions) proposal
        |||   ```js
        |||   import json from "./foo.json" assert {"{"} type: "json" {"}"};
        |||   ```
        ||| - [TypeScript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/) support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.11.0" date="Jul 2020">
        ||| - Enable the [Logical Assignment](https://github.com/tc39/proposal-logical-assignment/) and
        |||   [Numeric Separator](https://github.com/tc39/proposal-numeric-separator) Stage 4 proposals by default
        ||| - Parser support for the [Decimal](https://github.com/tc39/proposal-decimal) proposal
        |||   ```js
        |||   console.assert(0.1m + 0.2m === 0.3m);
        |||   ```
        ||| - [TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/) support
      </TimelineEvent>
      <TimelineEvent
        name="@babel/eslint-parser"
        link="https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint"
      />
      <TimelineEvent name="Babel 7.10.0" date="May 2020">
        ||| - Enable parser support for the [`import.meta`](https://github.com/tc39/proposal-import-meta/) Stage 4 proposal by default
        ||| - Support for the [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in) proposal
        |||   ```js
        |||   class Car {"{"}
        |||     #plate;
        |||     race(other) {"{"}
        |||        if (#plate in other) console.log("Racing against another car!");
        |||     {"}"}
        |||   {"}"}
        |||   ```
      </TimelineEvent>
      <TimelineEvent
        name="babel-polyfills"
        link="https://github.com/babel/babel-polyfills"
      />
      <TimelineEvent name="Babel 7.9.0" date="Mar 2020">
        ||| - `bugfixes` option in `@babel/preset-env`, to workaround browsers bugs rather than compiling whole Features
        ||| - [TypeScript 3.8](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/) support
        ||| - Support for Flow `declare` class fields
        ||| - Support for the [automatic](https://it.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html") JSX runtime
      </TimelineEvent>
      <TimelineEvent name="Babel 7.8.0" date="Jan 2020">
        ||| - Enable the [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) and the
        |||   [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) Stage 4 proposals by default
        ||| - Support `.mjs` configuration files
      </TimelineEvent>
      <TimelineEvent name="Babel 7.7.0" date="Nov 2019">
        ||| - Parser support for the [top-level `await`](https://github.com/tc39/proposal-top-level-await) proposal
        |||   ```js
        |||   import db from "./database.js";
        |||
        |||   await db.connect();
        |||   ```
        ||| - Add error recovery support for Early Errors in `@babel/parser`
        ||| - Support `.json` and `.cjs` configuration files
        ||| - [TypeScript 3.7](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/) support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.6.0" date="Sep 2019">
        ||| - Support for static private accessors, part of the
        |||   [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
        |||   ```js
        |||   class Dog {"{"}
        |||     static get #className() {"{"} return "Dog"; {"}"}
        |||   {"}"}
        |||   ```
      </TimelineEvent>
      <TimelineEvent name="Babel 7.5.0" date="Jul 2019">
        ||| - Support for the [F# pipeline operator](https://github.com/valtech-nyc/proposal-fsharp-pipelines/) proposal
        |||   ```js
        |||   num |> add(2) |> double
        |||   ```
        ||| - TypeScript `namespace` support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.4.0" date="Mar 2019">
        ||| - Support for injecting `core-js@3` polyfills
        ||| - Support for the [Partial Application](https://github.com/tc39/proposal-partial-application/) proposal
        |||   ```js
        |||   strings.map(parseInt(?));
        |||   ```
        ||| - Support for static private methods, part of the
        |||   [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
        |||   ```js
        |||   class Dog {"{"}
        |||     static #register() {"{"} /* ... */ {"}"}
        |||   {"}"}
        |||   ```
        ||| - [TypeScript 3.4](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/) support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.3.0" date="Jan 2019">
        ||| - Support for instance private accessors, part of the
        |||   [private methods](https://github.com/tc39/proposal-private-methods/) proposal
        |||   ```js
        |||   class Dog {"{"}
        |||     get #randomId() {"{"} return Math.random(); {"}"}
        |||   {"}"}
        |||   ```
        ||| - Support for the [smart pipeline operator](https://github.com/js-choi/proposal-smart-pipelines/) proposal
        |||   ```js
        |||   num |> add(2, #) |> double
        |||   ```
        ||| - Support for
        |||   [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges#using_named_groups)
        |||   in regular expressions
        |||   ```js
        |||   str.match({String.raw`/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/`})
        |||   ```
        ||| - TypeScript 3.2 and 2.9 support
      </TimelineEvent>
      <TimelineEvent name="Babel 7.2.0" date="Dec 2018">
        ||| - Support for instance private methods, part of the [private methods](https://github.com/tc39/proposal-private-methods/) proposal
        |||   ```js
        |||   class Dog {"{"}
        |||     #bark() {"{"} console.log("Mew!") {"}"}
        |||   {"}"}
        |||   ```
      </TimelineEvent>
      <TimelineEvent name="Babel 7.1.0" date="Sep 2018">
        ||| - Support for the [decorators](https://babeljs.io/blog/2018/09/17/decorators) proposal, as it was specified in September 2018
        |||   ```js
        |||   class Person {"{"}
        |||     @autoIncrement age;
        |||   {"}"}
        |||   ```
        ||| - Support for static private fields, part of the [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
        |||   ```js
        |||   class Person {"{"}
        |||     static #classId = 3;
        |||   {"}"}
        |||   ```
      </TimelineEvent>
      <TimelineEvent name="Babel 7" date="Aug 2018" />
    </ol>
  </div>;

module.exports = Timeline;
