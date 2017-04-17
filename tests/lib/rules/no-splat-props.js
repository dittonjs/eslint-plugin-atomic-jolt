"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-splat-props"),
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

ruleTester.run("no-splat-props", rule, {
  valid: [
    {code: "<div style={{}}>Hello world</div>", parserOptions: parserOptions},
    {code: "<div {...someOtherObject}>Hello world</div>", parserOptions: parserOptions}
  ],
  invalid: [
    {
      code: "<div {...this.props}>Hello world</div>",
      parserOptions: parserOptions,
      errors: [{
        message: 'Do not splat the props to child components, instead pass each prop individualy or create an object that has only the values that the child needs from probs and splat that object.',
        type: "JSXOpeningElement"
      }]
    }, {
      code: "<div {...props}>Hello world</div>",
      parserOptions: parserOptions,
      errors: [{
        message: 'Do not splat the props to child components, instead pass each prop individualy or create an object that has only the values that the child needs from probs and splat that object.',
        type: "JSXOpeningElement"
      }]
    }
  ]
});
