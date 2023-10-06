import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/HomePage.vue';
import Stops from '@/pages/StopsPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Home },
  { path: '/stops', name: 'stops', component: Stops },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
