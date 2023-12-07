import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksView.vue'
import CreateBookView from '../views/CreateBookView.vue'
import Home from '../views/Home.vue'
import BookEdit from '../views/BookEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'books',
          component: BooksView,
        },
        {
          path: '/create',
          name: 'create',
          component: CreateBookView
        }
      ]
    },
    {
      path: '/book/:id',
      name: 'bookEdit',
      component: BookEdit
    }
  ]
})

export default router
