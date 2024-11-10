import { defineStore } from "pinia"
import { computed, ref } from "vue"

import { v4 as uuidv4 } from 'uuid';

import type { Project } from "../interfaces/project.interface";
import { useLocalStorage } from "@vueuse/core";


export const useProjectStore = defineStore('projects', () => {
    const projects = ref(useLocalStorage<Project[]>('projects', [],));
    const projectList = computed(() => [...projects.value]);

    const addProject = (name: string) => {
        if (!name) return;

        projects.value.push({
            id: uuidv4(),
            name,
            tasks: [],
        })
    }

    const addTaskToProject = (projectId: string, task: string) => {
        const project = projects.value.find(project => project.id === projectId);

        if (!project || task.trim().length === 0) return;

        project.tasks.push({
            id: uuidv4(),
            name: task,
            completedAt: undefined,
        })
    }

    const toggleTask = (projectId: string, taskId: string) => {
        const project = projects.value.find(project => project.id === projectId);

        if (!project) return;

        const task = project.tasks.find(task => task.id === taskId);

        if (!task) return;

        task.completedAt = task.completedAt ? undefined : new Date();
    }

    return {
        projects,
        projectList,

        projectsWithCompletedTasks: computed(() => {
            return projects.value.map(project => {
                const total = project.tasks.length;
                const completed = project.tasks.filter(task => task.completedAt).length;
                const compleation = total === 0 ? 0 : Math.round((completed / total) * 100);

                return {
                    id: project.id,
                    name: project.name,
                    taskCount: total,
                    completion: compleation,
                }
            })
        }),

        addProject,
        addTaskToProject,
        toggleTask,
        noProjects: computed(() => projectList.value.length === 0),
    }
})