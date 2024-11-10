<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'no name'" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 2 -->
            <tr class="hover" v-for="task in project?.tasks" :key="task.id">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTask(props.id, task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover">
              <th></th>
              <td colspan="2">
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="task"
                  @keyup.enter="saveTask"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectStore } from '../stores/projects.store';
import type { Project } from '../interfaces/project.interface';
interface Props {
  id: string;
}

const router = useRouter();
const props = defineProps<Props>();
const projectStore = useProjectStore();
const project = ref<Project | null>();
const task = ref<string>();

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((p) => p.id === props.id) ?? null;

    if (!project.value) {
      router.replace('/');
    }
  },
  { immediate: true },
);

const saveTask = () => {
  if (task.value) {
    projectStore.addTaskToProject(props.id, task.value);

    task.value = '';
  }
};
</script>
