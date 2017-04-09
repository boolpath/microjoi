'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(definitions) {
  let swagger = {}

  for (let property in setClassNames(definitions)){
    let {definitions: previous} = joi2swagger(definitions[property], swagger)
    Object.assign(swagger, previous)
  }

  return swagger
}

function setClassNames(definitions) {
  for (let property in definitions) {
    let definition = definitions[property]
    let metaClassName = definition._meta.find(meta => meta.className)
    if (definition && definition.isJoi && !metaClassName) {
      definitions[property] = definition.meta({className: property})
    }
  }
  return definitions
}

module.exports = {
  parse
}
