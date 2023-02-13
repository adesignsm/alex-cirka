import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import loading from './loading'
import projects from './projects'
import about from './about'
import heroImage from './heroImage'
import headerLogo from './headerLogo'
import fontFile from './fontFile'
import footer from './footer'
import colors from './colors'
import misc from "./misc"

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    loading,
    projects,
    about,
    headerLogo,
    heroImage,
    fontFile,
    colors,
    misc,
    footer
  ]),
})
