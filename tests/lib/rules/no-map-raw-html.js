"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-map-raw-html"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

const errors = [{
  message: 'React components returned from map functions should not be raw html elements. Extract raw html into a new component and return that component from the map.',
  type: "CallExpression"
}];
const options = ['div,span,tr'];
ruleTester.run("no-map-raw-html", rule, {
  valid: [
    {code: "_.map([], () => <SomeComponent />)", options, parserOptions},
    {code: "_.map([], () => <div />)", options: ['tr,span'], parserOptions},
    {code: "_.map([])", options: ['tr,span'], parserOptions},
    {code: "[].map(() => <SomeComponent />)", options, parserOptions},
    {code: "map([], () => <SomeComponent />)", options, parserOptions},
    {code: "_.map([], () => {const thing=10; return <SomeComponent />})", options, parserOptions},
    {code: "_.map([], function(){const thing=10; return <SomeComponent />})", options, parserOptions},
  ],
  invalid: [{
    code: "_.map([], () => <div />)",
    options,
    parserOptions,
    errors
  },{
    code: "_.map([], () => <div />)",
    options: ['div'],
    parserOptions,
    errors
  }, {
    code: "_.map([], () => {return <div />})",
    options,
    parserOptions,
    errors
  }, {
    code: "_.map([], function(){return <div/>})",
    options,
    parserOptions,
    errors
  }]
});
