import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', component: () => import(/* webpackChunkName: "tribe" */ '../views/Tribe.vue'),
      children: [
        { path: '', name: 'home', component: () => import(/* webpackChunkName: "calendar" */ '../views/EventsPage.vue') },
      ],
    },
    { name: 'login', path: '/login', component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue') },
    { name: 'suscribe', path: '/suscribe', component: () => import(/* webpackChunkName: "suscribe" */ '../views/SuscribePage.vue') },
    { name: 'confirm', path: '/confirm/:token', component: () => import(/* webpackChunkName: "confirmation" */ '../views/ConfirmationPage.vue'), props: true },
    { name: 'invitation', path: '/invitation', component: () => import(/* webpackChunkName: "invitation" */ '../views/InvitationPage.vue') },
  ],
})
