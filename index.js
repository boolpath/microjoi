#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const requireDirectory = require('require-directory')
const generateSwagger = require('./swagger')
const joi = global.joi = require('joi')

let [,, apiPath] = process.argv
let path2schemas = path.resolve(process.cwd(), apiPath || 'api', 'schemas')
let path2swagger = path.resolve(process.cwd(), apiPath || 'api', 'swagger.json')

let schemas = requireDirectory(module, path2schemas)
let swagger = generateSwagger(schemas, {info: {name: 'Swagger API'}})
let swaggerFile = JSON.stringify(swagger, null, 3)

fs.writeFile(path2swagger, swaggerFile, {flag: 'w+'}, (err, data) => {
  if (err) throw err
})
