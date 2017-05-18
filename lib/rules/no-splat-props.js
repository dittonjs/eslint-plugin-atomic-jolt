const _ = require('lodash');

module.exports = {
  meta: {
    docs: {
      description: "disallow {...props} or {...this.props} in react",
      category: "Possible Errors",
      recommended: true,
    },
    schema: []
  },
  create: function(context){
    const source = context.getSourceCode();
    return {
      JSXOpeningElement: function(node){
        console.log(source)
        const tokens = source.getTokens(node);
        const spreadIndex = _.findIndex(tokens, (token)=>(token.type === 'Punctuator' && token.value === '...'));
        if(spreadIndex > 0){
          if(tokens[spreadIndex+1].type === 'Keyword' && tokens[spreadIndex+1].value === 'this'){
            if(tokens[spreadIndex+2].type === 'Punctuator' && tokens[spreadIndex+2].value === '.' && tokens[spreadIndex+3].value === 'props'){
              context.report({
                node: node,
                message: 'Do not splat the props to child components, instead pass each prop individualy or create an object that has only the values that the child needs from probs and splat that object.'
              });
            }
          } // need to handle this better
          // else if (tokens[spreadIndex + 1].type === 'Identifier' && tokens[spreadIndex+1].value === 'props'){
          //   context.report({
          //     node: node,
          //     message: 'Do not splat the props to child components, instead pass each prop individualy or create an object that has only the values that the child needs from probs and splat that object.'
          //   });
          // }
        }
      }
    }
  }
}
