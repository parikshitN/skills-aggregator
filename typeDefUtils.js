const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { print } = require('graphql')
const fs = require('fs')

const loadedFiles = loadFilesSync(`${__dirname}/src/graphql/**/*.graphql`)
const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs)
fs.writeFileSync(`${__dirname}/src/graphql/schema.graphql`, printedTypeDefs)
