import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'

import markdown from 'markdown-it'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) { 
    app.component(key, component)
}

app.directive('highlight', {
    mounted(el) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block:any) => {
            hljs.highlightBlock(block)
        })
    }
})

app.mount('#app')
