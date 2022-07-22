import Vue from 'vue'
import VueGamepad from 'vue-gamepad';
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueGamepad);


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:11000'
}))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
