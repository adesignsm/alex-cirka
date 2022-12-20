import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import projects from './projects'
import about from './about'
import heroImage from './heroImage'
import headerLogo from './headerLogo'
import fontFile from './fontFile'
import footer from './footer'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    projects,
    about,
    headerLogo,
    heroImage,
    fontFile,
    footer
  ]),
})
