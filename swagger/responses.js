'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(definitions, predefinitions) {
  let responses = {}

  for (let property in definitions) {
    let {description, body, examples} = definitions[property]
    let schema = body && body.isJoi ? body : joi.object().keys(body)
    if (schema.isJoi) {
      let {swagger} = joi2swagger(schema, predefinitions)
      responses[property] = {description, schema: swagger, examples}
    }
  }

  return responses
}

module.exports = {
  parse
}
