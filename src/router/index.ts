import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/accounts/SignupPage/Signup.vue'
import Login from '../components/accounts/LoginPage/Login.vue'
import MovieDetail from '../components/movies/DetailPage/MovieDetail.vue'
import VerticalSlideGenre from '../components/movies/MainPage/VerticalSlideGenre.vue'
import SearchMovie from '../components/movies/Navbar/SearchMovie.vue'
import MyList from '../components/movies/MyListPage/MyList.vue'

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
    component: Login,
  },
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/movies/genre/:id',
    name: 'VerticalSlideGenre',
    component: VerticalSlideGenre,
  },
  {
    path: '/search/:keyword',
    name: 'SearchMovie',
    component: SearchMovie,
    props: true,
  },
  {
    path: '/movies/mylist',
    name: 'MyList',
    component: MyList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
