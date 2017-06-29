'use strict'

function build({
  swagger = '2.0',
  info = {
    version: "1",
    title: '(API Name)'
  },
  host = 'localhost:3000',
  basePath = '/',
  schemes = ['https'],
  consumes = ['application/json'],
  produces = ['application/json'],
  paths = {},
  definitions = {}
}) {
  return {
    swagger, info, host, basePath, schemes, consumes, produces,
    paths,
    definitions
  }
}

module.exports = {
  build
}
