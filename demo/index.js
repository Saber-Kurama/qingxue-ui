import { createApp } from 'vue'
import SiteRoot from './SiteRoot.vue'
import createDemoRouter from './routes/router'

const app = createApp(SiteRoot)
const routes = []
const router = createDemoRouter(app, routes)

app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
