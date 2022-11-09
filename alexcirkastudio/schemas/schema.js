import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import projects from './projects'
import hero from './hero'
import fontFile from './fontFile'
import footer from './footer'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    projects,
    hero,
    fontFile,
    footer
  ]),
})
