import { createRouter, createWebHistory } from 'vue-router'
import chat_space from '@/views/chat_space.vue'
import chat_history from '@/views/chat_history.vue'
import settings from '@/views/settings.vue'
import instruction from '@/views/instructions.vue'
import instruction_en from '@/views/instruction_en.vue'
import instruction_zh from '@/views/instruction_zh.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/chat_space',
      name: 'chat_space',
      component: chat_space
    },
    {
      path: '/',
      name: '/',
      component: settings
    },
    {
      path: '/chat_history',
      name: 'chat_history',
      component: chat_history
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/instruction',
      name: 'instruction',
      component: instruction,
      redirect: '/instruction/instruction_en', // Add redirect to instruction_en
      children: [
        {
          name: 'instruction_en',
          path: 'instruction_en', // 字路由不需要加 /，否则会被认为是根路由
          component: instruction_en
        },
        {
          name: 'instruction_zh',
          path: 'instruction_zh',
          component: instruction_zh
        }
      ]
    }
  ]
})

export default router