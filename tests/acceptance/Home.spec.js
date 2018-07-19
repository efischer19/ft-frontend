import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';
import mockAxios from 'jest-mock-axios';
import Home from '@/views/Home.vue';
import router from '@/router';

const mockResponseObj = require('./posts.json');

describe('Home', () => {
  it('should match snapshot', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor({
      router,
      propsData: {
        id: 'mc',
      },
    }).$mount();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/posts2.json');
    mockAxios.mockResponse({ data: mockResponseObj });

    const renderer = createRenderer();
    Vue.nextTick(() => {
      renderer.renderToString(
        vm,
        (err, str) => {
          if (err) throw new Error(err);
          expect(str).toMatchSnapshot();
        },
      );
    });
  });
});
