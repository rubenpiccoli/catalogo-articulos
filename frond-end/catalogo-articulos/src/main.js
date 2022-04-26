import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faUserSecret,faCoffee,faArrowsDownToPeople } from '@fortawesome/free-solid-svg-icons'
import { faGithub  } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret,faCoffee,faArrowsDownToPeople,faGithub )

//Vue.component('font-awesome-icon', FontAwesomeIcon)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
