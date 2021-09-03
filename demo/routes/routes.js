
export const componentRoutes = [
  {
    path: '/button',
    component: () => import('../../src/button/demos/basic.demo.md')
  }
]

export const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('../pages/home/index.vue')
  },
  ...componentRoutes
]