<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Projecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectsStore.projectsWithCompletedTasks"
          :key="project.id"
          class="hover"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputModal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectsStore.addProject"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
  />

  <CustomModal :open="customModalOpen">
    <template #header>
      <h1>Custom Modal</h1>
    </template>

    <template #body>
      <p>Sunt est proident aliquip qui ea anim dolore dolore fugiat adipisicing.</p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </CustomModal>

  <FabButton position="bottom-right" @click="modalOpen = true">
    <AddCircle />
  </FabButton>

  <FabButton position="bottom-left" @click="customModalOpen = true">
    <AddCircle />
  </FabButton>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';
import { useProjectStore } from '../stores/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectStore();
</script>
