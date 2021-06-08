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
    hideInMenu: true,
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
    // name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        // redirect: '/dashboard/analysis',
        component: { render: h => h('router-view') },
        // meta: { title: 'menu.dashboard', keepAlive: true, permission: ['dashboard'] },
        meta: { icon: 'dashboard', title: '仪表盘' },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/Dashboard/Analysis.vue'),
            // meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
            meta: {title: '分析页'}
          },
        ]
      },
      // forms
      {
        path: '/form',
        name: 'form',
        redirect: '/form/base-form',
        component: { render: h => h('router-view') },
        // meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        meta: { icon: 'form', title: '表单' },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/Forms/BasicForm'),
            // meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
            meta: {title: '基础表单'}
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            hideChildrenInMenu: true,
            component: () => import('@/views/Forms/StepForm/index'),
            // meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] },
            meta: {title: '分步表单'},
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info'
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () => import(/* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step1.vue')
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () => import(/* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step2.vue')
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () => import(/* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step3.vue')
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
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
