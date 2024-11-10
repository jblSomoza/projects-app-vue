<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">
      <RouterLink to="/"> Proyectos </RouterLink>
    </h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- MENU -->
    <ul v-else class="menu rounded-box w-56">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details open>
            <summary>
              <RouterLink :to="`/project/${project.id}`">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul v-for="tasks in project.tasks" :key="tasks.id">
              <RouterLink :to="`/projects/${project.id}`">
                {{ tasks.name }}
              </RouterLink>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">
            {{ project.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectStore } from '../stores/projects.store';

const projectsStore = useProjectStore();
</script>
