import { shallowMount } from '@vue/test-utils';
import FabButton from '../../../../src/modules/common/components/FabButton.vue';

describe('FabButton', () => {
    test('renders with default position', async () => {
        const wrapper = shallowMount(FabButton);
        const buttonClases = wrapper.find('button').classes();
        const classesToHave = buttonClases;

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.props().position).toBe('bottom-right');
        expect(buttonClases).toEqual(expect.arrayContaining(classesToHave));
    });

    test('renders with custom position', async () => {
        const wrapper = shallowMount(FabButton, {
            props: {
                position: 'top-left'
            }
        });
        const buttonClases = wrapper.find('button').classes();
        const classesToHave = buttonClases;

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.props().position).toBe('top-left');
        expect(buttonClases).toEqual(expect.arrayContaining(classesToHave));
    });

    test('renders slot content inside button', async () => {
        const wrapper = shallowMount(FabButton, {
            slots: {
                default: '<div>Test</div>'
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('button').text()).toBe('Test');
        expect(wrapper.find('button').find('div').exists()).toBe(true);
    });
});