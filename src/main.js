import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import { FormValid, NavTab } from '@/components'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(FormValid.name, FormValid)
Vue.component(NavTab.name, NavTab)

new Vue({
  render: h => h(App)
}).$mount('#app')
