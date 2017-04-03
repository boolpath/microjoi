'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(object, location, parameters = []) {
  for (let property in object) {
    if (!object[property].isJoi) {
      parse(object[property], property, parameters)
    } else {
      let {swagger, definitions} = joi2swagger(object[property])
      let parameter = Object.assign({
        name: property,
        in: location
      }, swagger)
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
