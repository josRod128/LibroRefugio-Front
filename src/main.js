import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Swal from 'sweetalert2'

import axios from 'axios';
const axiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});
const envRoute = import.meta.env.VITE_ROUTE_BACK

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$axios = { ...axiosInstance };
app.config.globalProperties.$envRoute = envRoute;
app.config.globalProperties.$swal = Swal;
app.use(ElementPlus)
app.use(router)

app.mount('#app')
