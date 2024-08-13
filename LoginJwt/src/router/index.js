// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router

import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/HomeView.vue'
import Login from '../components/LoginView.vue'
import Register from '../components/RegisterView.vue'
// lazy-loaded
const Profile = () => import('../components/ProfileView.vue')
const BoardAdmin = () => import('../components/BoardAdmin.vue')
const BoardModerator = () => import('../components/BoardModerator.vue')
const BoardUser = () => import('../components/BoardUser.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: Profile
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: BoardAdmin
  },
  {
    path: '/mod',
    name: 'moderator',
    // lazy-loaded
    component: BoardModerator
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: BoardUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})
