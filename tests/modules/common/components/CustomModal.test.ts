import { mount } from "@vue/test-utils";
import CustomModal from '../../../../src/modules/common/components/CustomModal.vue';

describe('CustomModal', () => {
    test('renders dialog with default state', async () => {
        const wrapper = mount(CustomModal);
        const modal = wrapper.find('.modal');

        expect(modal.attributes('open')).toBeUndefined();
    });

    test('renders dialog with open state', async () => {
        const wrapper = mount(CustomModal, {
            props: {
                open: true
            }
        });
        const modal = wrapper.find('.modal');

        expect(modal.attributes('open')).toBeDefined();
    });

    test('renders dialog with header, body and footer slots', async () => {
        const wrapper = mount(CustomModal, {
            slots: {
                header: '<div>Header</div>',
                body: '<div>Body</div>',
                footer: '<div>Footer</div>'
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toContain('Header');
        expect(wrapper.text()).toContain('Body');
        expect(wrapper.text()).toContain('Footer');

    });

    test('opens and closes dialog', async () => {
        const wrapper = mount(CustomModal);
        const modal = wrapper.find('.modal');

        expect(modal.attributes('open')).toBeUndefined();

        await wrapper.setProps({ open: true });

        expect(modal.attributes('open')).toBeDefined();

        await wrapper.setProps({ open: false });

        expect(modal.attributes('open')).toBeUndefined();
    });
});