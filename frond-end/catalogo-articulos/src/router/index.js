import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Encabezado from '../components/Encabezado.vue';
import Piepagina from '../components/Piepagina.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/encabezado',
    name: 'Encabezado',
    component: Encabezado 
  },
  {
    path: '/Piepagina',
    name: 'Piepagina',
    component: Piepagina
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router