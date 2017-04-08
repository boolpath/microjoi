'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(object, location, parameters = []) {
  for (let property in object) {
    let schema = object[property]
    if (!schema.isJoi) {
      parse(schema, property, parameters)
    } else {
      let {swagger} = joi2swagger(schema)
      let parameter = Object.assign({
        name: property,
        in: location || property,
        description: schema._description || undefined,
        required: schema._flags.presence === 'required' || undefined
      }, swagger)
      if (parameter['$ref']) {
        parameter.schema = {'$ref': swagger['$ref']}
        delete parameter['$ref']
      }
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
