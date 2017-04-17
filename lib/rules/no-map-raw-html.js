const _ = require('lodash');

module.exports = {
  meta: {
    docs: {
      description: "disallow the returning of raw html elements from map functions",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [{type: 'string'}]
  },
  create: function(context){
    const source = context.getSourceCode();
    const tags = context.options[0] ? context.options[0].split(',') : ['div', 'span', 'tr']
    return {
      CallExpression: function(node){
        const tokens = source.getTokens(node);
        // console.log(node)
        if(node.callee.property && node.callee.property.name === 'map'){
          const functionIndex = node.arguments.length == 2 ? 1 : 0;
          const body = node.arguments[functionIndex].body
          if(body.type == 'JSXElement'){
            if(_.includes(tags, body.openingElement.name.name)){
              context.report({
                node: node,
                message: 'React components returned from map functions should not be raw html elements. Extract raw html into a new component and return that component from the map.'
              });
            }
          } else if(body.type === 'BlockStatement') {
            // that a lot of body
            const lastBodyNode = body.body[body.body.length - 1];
            if(lastBodyNode.type === 'ReturnStatement'){
              const returnArg = lastBodyNode.argument
              if(returnArg.type === 'JSXElement'){
                if(_.includes(tags, returnArg.openingElement.name.name)){
                  context.report({
                    node: node,
                    message: 'React components returned from map functions should not be raw html elements. Extract raw html into a new component and return that component from the map.'
                  });
                }
              }

            }
          }
        }
      }
    }
  }
}
