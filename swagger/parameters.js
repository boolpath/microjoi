'use strict'

const joi = require('joi')
const joi2swagger = require('joi-to-swagger')

function parse(definitions, predefinitions, location, parameters = []) {
  for (let property in definitions) {
    let schema = definitions[property]
    if (!schema.isJoi) {
      parse(schema, predefinitions, property, parameters)
    } else {
      let {swagger} = joi2swagger(schema, predefinitions)
      let parameter = Object.assign({
        name: property,
        in: location || property,
        description: schema._description || undefined,
        required: schema._flags.presence === 'required' || undefined,
        schema: swagger.$ref ? {$ref: swagger.$ref} : undefined
      }, swagger)

      delete parameter['$ref']
      parameters.push(parameter)
    }
  }
  return parameters
}

function required(request, requireds = []) {
  let requestSwagger = joi2swagger(joi.object().keys(request)).swagger
  for (let location in requestSwagger.properties) {
    requireds.push(...(requestSwagger.properties[location].required || []))
  }
  return requireds
}

module.exports = {
  parse,
  required
}
