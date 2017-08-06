#!/usr/bin/env node
// Downloads various README files from GitHub.

const async = require('async');
const fetch = require('node-fetch');
const fs = require('fs');

const packageReadmes = [
  {
    repo: 'babel',
    packages: [
      'babylon',
      'babel-code-frame',
      'babel-helpers',
      'babel-template',
      'babel-types',
      'babel-core',
      'babel-plugin-check-es2015-constants',
      'babel-plugin-external-helpers',
      'babel-preset-env',
      'babel-preset-es2015',
      'babel-preset-es2016',
      'babel-preset-es2017',
      'babel-preset-flow',
      'babel-preset-latest',
      'babel-preset-react',
      'babel-preset-stage-0',
      'babel-preset-stage-1',
      'babel-preset-stage-2',
      'babel-preset-stage-3',
      'babel-plugin-syntax-async-functions',
      'babel-plugin-syntax-async-generators',
      'babel-plugin-syntax-class-constructor-call',
      'babel-plugin-syntax-class-properties',
      'babel-plugin-syntax-decorators',
      'babel-plugin-syntax-do-expressions',
      'babel-plugin-syntax-dynamic-import',
      'babel-plugin-syntax-exponentiation-operator',
      'babel-plugin-syntax-export-extensions',
      'babel-plugin-syntax-flow',
      'babel-plugin-syntax-function-bind',
      'babel-plugin-syntax-function-sent',
      'babel-plugin-syntax-jsx',
      'babel-plugin-syntax-object-rest-spread',
      'babel-plugin-syntax-trailing-function-commas',
      'babel-plugin-transform-async-generator-functions',
      'babel-plugin-transform-async-to-generator',
      'babel-plugin-transform-async-to-module-method',
      'babel-plugin-transform-class-constructor-call',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators',
      'babel-plugin-transform-do-expressions',
      'babel-plugin-transform-es2015-arrow-functions',
      'babel-plugin-transform-es2015-block-scoped-functions',
      'babel-plugin-transform-es2015-block-scoping',
      'babel-plugin-transform-es2015-classes',
      'babel-plugin-transform-es2015-computed-properties',
      'babel-plugin-transform-es2015-destructuring',
      'babel-plugin-transform-es2015-duplicate-keys',
      'babel-plugin-transform-es2015-for-of',
      'babel-plugin-transform-es2015-function-name',
      'babel-plugin-transform-es2015-literals',
      'babel-plugin-transform-es2015-modules-amd',
      'babel-plugin-transform-es2015-modules-commonjs',
      'babel-plugin-transform-es2015-modules-systemjs',
      'babel-plugin-transform-es2015-modules-umd',
      'babel-plugin-transform-es2015-object-super',
      'babel-plugin-transform-es2015-parameters',
      'babel-plugin-transform-es2015-shorthand-properties',
      'babel-plugin-transform-es2015-spread',
      'babel-plugin-transform-es2015-sticky-regex',
      'babel-plugin-transform-es2015-template-literals',
      'babel-plugin-transform-es2015-typeof-symbol',
      'babel-plugin-transform-es2015-unicode-regex',
      'babel-plugin-transform-es3-member-expression-literals',
      'babel-plugin-transform-es3-property-literals',
      'babel-plugin-transform-es5-property-mutators',
      'babel-plugin-transform-eval',
      'babel-plugin-transform-exponentiation-operator',
      'babel-plugin-transform-export-extensions',
      'babel-plugin-transform-flow-comments',
      'babel-plugin-transform-flow-strip-types',
      'babel-plugin-transform-function-bind',
      'babel-plugin-transform-jscript',
      'babel-plugin-transform-member-expression-literals',
      'babel-plugin-transform-object-assign',
      'babel-plugin-transform-object-rest-spread',
      'babel-plugin-transform-object-set-prototype-of-to-assign',
      'babel-plugin-transform-proto-to-assign',
      'babel-plugin-transform-react-constant-elements',
      'babel-plugin-transform-react-display-name',
      'babel-plugin-transform-react-inline-elements',
      'babel-plugin-transform-react-jsx-compat',
      'babel-plugin-transform-react-jsx-self',
      'babel-plugin-transform-react-jsx-source',
      'babel-plugin-transform-react-jsx',
      'babel-plugin-transform-regenerator',
      'babel-plugin-transform-runtime',
      'babel-plugin-transform-strict-mode',
      'babel-plugin-undeclared-variables-check',
      'babel-core',
      'babel-register',
      'babel-cli',
      'babel-polyfill',
      'babel-register',
    ]
  }, {
    repo: 'babili',
    packages: [
      'babel-plugin-minify-constant-folding',
      'babel-plugin-minify-dead-code-elimination',
      'babel-plugin-minify-flip-comparisons',
      'babel-plugin-minify-guarded-expressions',
      'babel-plugin-minify-infinity',
      'babel-plugin-minify-mangle-names',
      'babel-plugin-minify-numeric-literals',
      'babel-plugin-minify-replace',
      'babel-plugin-minify-simplify',
      'babel-plugin-minify-type-constructors',
      'babel-plugin-transform-inline-consecutive-adds',
      'babel-plugin-transform-inline-environment-variables',
      'babel-plugin-transform-merge-sibling-variables',
      'babel-plugin-transform-minify-booleans',
      'babel-plugin-transform-node-env-inline',
      'babel-plugin-transform-property-literals',
      'babel-plugin-transform-regexp-constructors',
      'babel-plugin-transform-remove-console',
      'babel-plugin-transform-remove-debugger',
      'babel-plugin-transform-simplify-comparison-operators',
      'babel-plugin-transform-undefined-to-void',
    ],
  }, {
    repo: 'babel-preset-env',
    packages: [
      'babel-preset-env',
    ],
    customURIs: {
      'babel-preset-env': '/README.md',
    },
  }, {
    repo: 'babylon',
    packages: [
      'babylon',
    ],
    customURIs: {
      'babylon': '/README.md',
    },
  },
];
const numConcurrentRequests = 20;

console.log('Downloading READMEs');
packageReadmes.forEach(repo => {
  async.mapLimit(repo.packages, numConcurrentRequests, (packageName, cb) => {
    const uri = repo.customURIs && repo.customURIs[packageName]
      ? repo.customURIs[packageName]
      : `/packages/${packageName}/README.md`;
    const readmeURL = `https://raw.githubusercontent.com/babel/${repo.repo}/master${uri}`;

    fetch(readmeURL)
      .then(res => res.text())
      .then(text => {
        fs.writeFile(`${__dirname}/../_includes/readmes/${packageName}.md`, text, cb);
        console.log(`- ${packageName}`);
      });
  });
});
