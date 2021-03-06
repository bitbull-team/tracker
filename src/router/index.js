import Vue from 'vue'
import Router from 'vue-router'

import Empty from '@/layouts/Empty'
import Application from '@/layouts/Application'

import Dashboard from '@/views/Dashboard.vue'
import Timers from '@/views/Timers.vue'
import Reports from '@/views/Reports.vue'
import LoggedTime from '@/views/Reports/ListLogged.vue'
import Issues from '@/views/Issues.vue'
import NewProfile from '@/views/profile/New.vue'
import EditProfile from '@/views/profile/Edit.vue'

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
          path: '/',
          name: 'dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        },
        {
          path: '/timers',
          name: 'timers',
          component: Timers,
          meta: { requiresAuth: true }
        },
        {
          path: '/issues',
          name: 'issues',
          component: Issues,
          meta: { requiresAuth: true }
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports,
          meta: { requiresAuth: true }
        },
        {
          path: '/reports/logged/:range',
          name: 'logged-time',
          component: LoggedTime,
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
        },
        {
          path: '/profile/:id',
          name: 'edit-profile',
          component: EditProfile
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
