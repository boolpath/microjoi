#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const requireDirectory = require('require-directory')
const joi = require('joi')

const generateSwagger = require('./swagger')

const [,, apiPath, definitionsPath] = process.argv
const cwd = process.cwd()
const api = apiPath || 'api'
const def = definitionsPath || api

const path2schemas = path.resolve(cwd, api, 'schemas')
const path2swagger = path.resolve(cwd, api, 'swagger.json')
const path2defines = path.resolve(cwd, def, 'definitions')
const schemas = requireDirectory(module, path2schemas)

let definitions = {}
let parameters = {}

try {parameters  = require(path2swagger)} catch (error) {/*not found*/}
try {definitions = require(path2defines)} catch (error) {
  try {definitions = requireDirectory(module, path2defines)}
  catch (error) {/*not found*/}
}

const swagger = generateSwagger(schemas, definitions, parameters)
const swaggerFile = JSON.stringify(swagger, null, 3)

fs.writeFile(path2swagger, swaggerFile, {flag: 'w+'}, (err, data) => {
  if (err) throw err
})
