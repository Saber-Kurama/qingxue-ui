import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export default function createDemoRouter (app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  return router
}