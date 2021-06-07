import Vue from "vue";
import VueRouter from "vue-router";
import BasicLayout from "../layouts/BasicLayout"
import NotFound from "../views/404.vue"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

const routes = [
  {
    path: '/user',
    name: 'user',
    // component: { render: h => h('router-view') },
    component: () => import(/* webpackChunkName: "user" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: { render: h => h('router-view') },
        meta: { title: 'menu.dashboard', keepAlive: true, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/Dashboard/Analysis.vue'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          // {
          //   path: '/dashboard/workplace',
          //   name: 'Workplace',
          //   component: () => import('@/views/dashboard/Workplace'),
          //   meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          // }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: { render: h => h('router-view') },
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/Forms/BasicForm'),
            meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/Forms/StepForm/index'),
            meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
          },
          // {
          //   path: '/form/advanced-form',
          //   name: 'AdvanceForm',
          //   component: () => import('@/views/form/advancedForm/AdvancedForm'),
          //   meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
          // }
        ]
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router;
