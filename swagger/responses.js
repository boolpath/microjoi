'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(object, location, responses = {}) {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      let {description, body, examples} = object[property]
      let schema = body && body.isJoi ? body : joi.object().keys(body)
      if (schema.isJoi) {
        let {swagger} = joi2swagger(schema)
        responses[property] = {description, schema: swagger, examples}
      }
    }
  }
  return responses
}

module.exports = {
  parse
}
