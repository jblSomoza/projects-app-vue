import { mount } from '@vue/test-utils';
import SideMenu from '@/components/SideMenu.vue';
import { createTestingPinia } from '@pinia/testing';
import { useProjectStore } from '';
import { nextTick } from 'vue';

const fakeProjects = [
    { id: 1, name: 'Proyecto 1' },
    { id: 2, name: 'Proyecto 2' }
];

describe('SideMenu.vue', () => {
    let wrapper: any;
    let store: any;

    beforeEach(() => {
        wrapper = mount(SideMenu, {
            global: {
                plugins: [createTestingPinia()]
            }
        });

        store = useProjectStore();

        store.$patch({
            projects: []
        });
    });

    test('should render with no projects', () => {
        expect(wrapper.html()).toContain('No hay proyectos');
    });

    test('should render with projects', async () => {
        store.$patch({
            projects: fakeProjects
        });

        await nextTick();

        expect(wrapper.html()).toContain('Proyectos');
    });
});