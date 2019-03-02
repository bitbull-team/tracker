import Vue from 'vue'
import Router from 'vue-router'

import Empty from '@/layouts/Empty'
import Application from '@/layouts/Application'

import Dashboard from '@/views/Dashboard.vue'
import NewProfile from '@/views/profile/NewProfile.vue'

import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Application,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/profile',
      component: Empty,
      children: [
        {
          path: '/profile/create',
          name: 'create-profile',
          component: NewProfile
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['profile/isAtLeastOneConfigured'] === false) {
      return next('/profile/create')
    }
    next()
  }
  next()
})

export default router
