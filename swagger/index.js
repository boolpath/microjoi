'use strict'

const joi = require('joi')
const pathjoin = require('path').join
const requireDirectory = require('require-directory')
const utils = requireDirectory(module)

const underscores = /\/_([a-zA-Z0-9\_\-]+)/g // path segments starting with _
const curlybraces = '/{$1}' // wrap URL parameters in curly braces {}

function convertSchemas(schemas = {}, predefinitions, mapping = {}, path = '/') {
  let schemap = {}

  for (let segment in schemas) {
    if (schemas.hasOwnProperty(segment)) {
      let {definitions, description} = (schemas[segment] || {})
      if (typeof definitions !== 'object') {
        let nextPath = pathjoin(path, segment).replace(underscores, curlybraces)
        convertSchemas(schemas[segment], predefinitions, mapping, nextPath)
      } else {
        let swagger = bundleFields(definitions, predefinitions, description)
        schemap[segment] = swagger
      }
    }
  }

  if (Object.keys(schemap).length) mapping[path] = schemap
  return mapping
}

function bundleFields(definitions, predefinitions, description = '') {
  let required = utils.parameters.required(definitions.request)
  let swagger = {
    description,
    parameters: utils.parameters.parse(definitions.request, predefinitions),
    responses: utils.responses.parse(definitions.responses, predefinitions)
  }

  for (let parameter of swagger.parameters) {
    if (required.indexOf(parameter.name) >= 0 &&
      typeof parameter.required !== 'boolean') {
      parameter.required = parameter.required || true
    }
  }

  return swagger
}

module.exports = (schemas, definitions = {}, parameters = {}) => {
  parameters.paths = convertSchemas(schemas, definitions)
  parameters.paths = Object.keys(parameters.paths).sort()
    .reduce((map, path) => (map[path] = parameters.paths[path]) && map, {})
  parameters.definitions = utils.definitions.parse(definitions)
  return utils.document.build(parameters)
}
