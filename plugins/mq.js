import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sm: 991,
    md: 1000,
    lg: Infinity,
  },
  defaultBreakpoint: 'md',
})
