import { createApp } from 'vue'
import SiteRoot from './SiteRoot.vue'
import createDemoRouter from './routes/router'
import { routes } from './routes/routes'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)

app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
