import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/accounts/Signup.vue'
import Login from '../components/accounts/Login.vue'
import MovieDetail from '../components/movies/MovieDetail.vue'
import VerticalSlideGenre from '../components/movies/VerticalSlideGenre.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/movies/:id',
    name: 'movieDetail',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/movies/genre/:id',
    name: 'movieGenre',
    component: VerticalSlideGenre,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
