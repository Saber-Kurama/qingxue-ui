import { createApp } from 'vue'
import naive from '../src/index'
import SiteRoot from './SiteRoot.vue'
import createDemoRouter from './routes/router'
import { routes } from './routes/routes'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)


app.use(router)
app.use(naive)
router.isReady().then(() => {
  app.mount('#app')
})
