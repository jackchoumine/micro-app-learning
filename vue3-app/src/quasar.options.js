import '@quasar/extras/mdi-v6/mdi-v6.css'
import { Dialog, Notify } from 'quasar'
import iconSet from 'quasar/icon-set/mdi-v6'
import zhCH from 'quasar/lang/zh-CN'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: { Notify, Dialog },
  lang: zhCH,
  iconSet,
}
