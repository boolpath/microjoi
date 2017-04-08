'use strict'

const joi2swagger = require('joi-to-swagger')

function parse(definitions) {
  let swagger = {}

  for (let property in definitions){
    let {definitions: previous} = joi2swagger(definitions[property], swagger)
    Object.assign(swagger, previous)
  }

  return swagger
}

module.exports = {
  parse
}
