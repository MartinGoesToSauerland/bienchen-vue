import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "BienchenOase.de"
      }
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/ImpressumView.vue'),
      meta: {
        title: "Impressum"
      }
    },
    {
      path: '/areas',
      name: 'areas',
      component: () => import('../views/AreaOverView.vue'),
      meta: {
        title: "Areas Overview"
      }
    },
    {
      path: '/areas/:id',
      name: 'area',
      component: () => import('../views/AreaView.vue'),
      meta: {
        title: "Area Detailpage"
      }
    },
    {
      path: "/:catchAll(.*)",
      name: "PageNotFound",
      component: () => import("../views/PageNotFoundView.vue"),
      meta: {
        title: "404"
      }
    }
  ]
})

router.beforeEach((to, from ,next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
