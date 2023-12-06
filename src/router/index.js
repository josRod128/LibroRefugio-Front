import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksView.vue'
import CreateBookView from '../views/CreateBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateBookView
    }
  ]
})

export default router
