/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import Vue from 'vue'
import StoryRouter from 'storybook-vue-router'
import AppStorybook from '../../src/stories/AppStorybook.vue'
import * as filters from '../../src/filters'
import directives from '../../src/directives'

Vue.component('AppStorybook', AppStorybook)

addDecorator(StoryRouter())
addDecorator(withNotes())

// https://storybook.js.org/basics/writing-stories/#using-decorators
addDecorator(() => {
  return {
    template: '<AppStorybook><story/></AppStorybook>'
  }
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global directives.
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

/*
To dynamically load stories with storyshot requires babel-plugin-require-context-hook but this conflicts
with storyshot so stories are loaded individually until this is fix.
// https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core#configure-jest-to-work-with-webpacks-requirecontext
require('babel-plugin-require-context-hook/register')()

// https://storybook.js.org/basics/writing-stories/#loading-stories-dynamically
const req = require.context('../../src/stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}
*/

function loadStories() {
  require('../../src/stories/Globals.stories')
  require('../../src/stories/Articles.stories')
  require('../../src/stories/Authors.stories')
}

configure(loadStories, module)
