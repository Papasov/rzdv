import Vue from 'vue'
import debounce from 'lodash/debounce'
import MobileViewportHeight from 'vue-mobile-viewport-height'

Vue.use(
  MobileViewportHeight({
    Vue, // required
    debounce, // optional debounce function
  })
)
