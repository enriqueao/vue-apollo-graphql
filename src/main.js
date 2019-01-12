// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://graphql-products.herokuapp.com/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(BootstrapVue);
Vue.use(VueApollo)
Vue.config.productionTip = false
/* eslint-disable no-new */
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  render: h => h(App)
})
