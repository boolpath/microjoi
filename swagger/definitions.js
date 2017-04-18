'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(definitions) {
  let swagger = {}

  for (let property in setClassNames(definitions)){
    let {definitions: previous} = joi2swagger(definitions[property], swagger)
    for (let definition in previous) {
      if (!swagger[definition] && property === definition) {
        swagger[definition] = previous[definition]
      }
    }
  }

  return swagger
}

function setClassNames(definitions) {
  for (let property in definitions) {
    let definition = definitions[property]
    if (!definition.isJoi) continue

    let metaClassName = definition._meta.find(meta => meta.className)
    if (definition.isJoi && !metaClassName) {
      definitions[property] = definition.meta({className: property})
    }
  }
  return definitions
}

module.exports = {
  parse
}
