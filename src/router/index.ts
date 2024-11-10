import { createRouter, createWebHistory } from 'vue-router'
import ProjectsLayouts from '@/modules/projects/layout/ProjectsLayouts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Projects' },
      component: ProjectsLayouts,
      children: [
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue')
        },
        {
          path: 'project/:id',
          name: 'Project',
          props: true,
          component: () => import('@/modules/projects/views/ProjectView.vue')
        }
      ]
    }

  ]
})

export default router
