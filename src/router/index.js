import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'

import { auth } from '@/js/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookListView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/usersettings',
      name: 'usersettings',
      component: () => import('../views/UserSettingsView.vue')
    }
  ]
})

router.beforeEach( (to) => {
  console.log("Before each is executed")
  console.log("to :" + to.name)
  if(to.name === "books" & !auth.currentUser) {
    console.log("login users only")
    router.push('/login')
  }
})


export default router
