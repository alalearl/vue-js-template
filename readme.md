# VUE JS TEMPALTE PLEASE GUIDE

This is template for vuejs 2.x and webpack 4 with babel and including eslint, prettier
with vuejs plugin vue-router and vuex

This project run on `8080` port, you can change port in `webpack.config.js` line `38`

because of this project including eslint and prettier, I recommended to use VSCode with at least 2 plugin
`vetur` and `prettier` for keep code formatting ( autosave on fix and code format rules has been setup for VSCode in `.vscode` folder)

I also add axios, lodash for shortcut your work!

## For ENV

use for environment variable

please create `env.dev.js` in `config/env/` to create development env
please create `env.prod.js` in `config/env/` to create production env

env template

```JS
module.exports = {
  NODE_ENV: 'development'
};
```

## For Router

use for make route in project

- in `index.js` of `router` folder you can add authenticated or prevent before router in here in `beforeEach` function
  for who want to authenticate user
- in `public.js` of `routes` folder is route for public that everyone can access
- in `private.js` of `routes` folder is route for private that user can access
- you can add more route branch in `routes` folder and import it in `index.js` of `routes` folder

## For Vuex

use you store variable

- use `module` folder to branch each module that you want to store and each module will be like this

```JS
// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```

## For styles

use `_global.scss` to set global style and you can also create new branch style file in `styles` folder and import it in `_global.scss`
(for recommended use `_{filename}.scss` pattern)

## For apis

use this folder to create api files each module that from axios or something

## For assets

use for keep resource such as `fonts`, `images`, ...

## For components

use for keep component each component in `page`

## For mixins

use for keep vuejs pattern that use frequency in many components

## For pages

use for keep page vue

## For utils

use for keep function that frequency using in many components
