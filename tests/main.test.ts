vi.mock('@/router', () => ({ default: 'router' }));

vi.mock('pinia', async (importOriginal) => {
    const mod = await importOriginal();
    return {
        ...mod as any,
        createPinia: vi.fn().mockReturnValue('pinia')
    }
})

describe('Main', () => {

    const vue = require('vue');
    const useSpy = vi.fn();
    const mountSpy = vi.fn();

    const createAppSpy = vi.fn().mockReturnValue({
        use: useSpy,
        mount: mountSpy
    });

    vue.createApp = createAppSpy;

    test('shoud be configured with pinia and router', async () => {
        await import('../src/main');

        expect(createAppSpy).toHaveBeenCalled();
        expect(mountSpy).toHaveBeenCalledWith('#app');

        expect(useSpy).toHaveBeenCalledWith('router');
        expect(useSpy).toHaveBeenCalledWith('pinia');
    });
});