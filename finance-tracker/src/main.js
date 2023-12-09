import './assets/main.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router' 
Vue.config.productionTip = false 
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/plugins/echarts" 
new Vue({ router, render: h => h(App) }).$mount('#app')
import { createApp } from 'vue'

createApp(App).mount('#app')
