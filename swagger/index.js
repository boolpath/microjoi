'use strict'

const joi = require('joi')
const pathjoin = require('path').join
const requireDirectory = require('require-directory')
const utils = requireDirectory(module)

const underscore = /\/_([a-zA-Z0-9\_\-]+)/g
const colonCurly = '/{$1}'

function convertSchemas(schemas = {}, mapping = {}, path = '/') {
  let schemap = {}

  for (let segment in schemas) {
    if (schemas.hasOwnProperty(segment)) {
      let {definitions, description} = (schemas[segment] || {})
      if (typeof definitions !== 'object') {
        path = path.replace(underscore, colonCurly)
        convertSchemas(schemas[segment], mapping, pathjoin(path, segment))
      } else {
        let swagger = bundleFields({definitions, description})
        schemap[segment] = swagger
      }
    }
  }

  if (Object.keys(schemap).length) mapping[path] = schemap
  return mapping
}

function bundleFields({definitions, description = ''}) {
  let swagger = {description}
  let required = utils.parameters.required(definitions.request)
  swagger.parameters = utils.parameters.parse(definitions.request)

  for (let parameter of swagger.parameters) {
    if (required.indexOf(parameter.name) >= 0) parameter.required = true
  }

  return swagger
}

module.exports = (schemas, params = {}) => {
  params.paths = convertSchemas(schemas)
  return utils.document.build(params)
}
