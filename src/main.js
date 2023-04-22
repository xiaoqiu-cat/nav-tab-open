import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import { FormValid } from '@/components'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(FormValid.name, FormValid)
new Vue({
  render: h => h(App)
}).$mount('#app')
