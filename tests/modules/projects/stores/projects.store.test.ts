import { useProjectStore } from "@/modules/projects/stores/projects.store";
import { createPinia, setActivePinia } from "pinia";
import { fakeProjects } from "../../../mocks/projects.fake";

describe('ProjectsStore', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    test('should return default values', () => {
        const {
            noProjects,
            addProject,
            projectList,
            projectsWithCompletedTasks,
            toggleTask,
            addTaskToProject,
        } = useProjectStore();

        expect(noProjects).toBe(true);

        expect(projectList).toEqual([]);
        expect(projectsWithCompletedTasks).toEqual([]);

        expect(toggleTask).toBeInstanceOf(Function);
        expect(addTaskToProject).toBeInstanceOf(Function);
        expect(addProject).toBeInstanceOf(Function);
    });

    test('should add a project', () => {
        const store = useProjectStore();

        store.addProject('Project 1');

        expect(store.noProjects).toBe(false);
        expect(store.projectList).toEqual([
            {
                id: expect.any(String),
                name: 'Project 1',
                tasks: [],
            }
        ]);
    });

    test('should load from local storage', () => {

        localStorage.setItem('projects', JSON.stringify(fakeProjects));

        const store = useProjectStore();

        expect(store.noProjects).toBe(false);
    });

    test('should add a task to a project', () => {
        const store = useProjectStore();

        store.addProject('Project 1');

        store.addTaskToProject(store.projectList[0].id, 'Task 1');

        expect(store.projectList[0].tasks).toEqual([
            {
                id: expect.any(String),
                name: 'Task 1',
                completedAt: undefined,
            }
        ]);
    });

    test('should toggle a task', () => {
        const store = useProjectStore();

        store.addProject('Project 1');

        store.addTaskToProject(store.projectList[0].id, 'Task 1');

        store.toggleTask(store.projectList[0].id, store.projectList[0].tasks[0].id);

        expect(store.projectList[0].tasks[0].completedAt).toBeDefined();

        store.toggleTask(store.projectList[0].id, store.projectList[0].tasks[0].id);

        expect(store.projectList[0].tasks[0].completedAt).toBeUndefined();
    });

    test('should return the projects with completed tasks', () => {
        const store = useProjectStore();
        store.$patch((state: any) => {
            state.projects = fakeProjects;
        });

        expect(store.projectsWithCompletedTasks).toEqual([
            { id: '1', name: 'Project 1', taskCount: 3, completion: 33 },
            { id: '2', name: 'Project 2', taskCount: 0, completion: 0 },
            { id: '3', name: 'Project 3', taskCount: 1, completion: 100 }
        ]);


    });
});