import { createRenderer } from 'vue-server-renderer';
import mockAxios from 'jest-mock-axios';
import Vue from 'vue';

import Blog from '@/views/Blog.vue';
import router from '@/router';

const mockResponseObj = require('./post_data.json');

describe('Blog', () => {
  it('should match snapshot', () => {
    const Constructor = Vue.extend(Blog);
    const vm = new Constructor({
      router,
      propsData: {
        id: 'mc',
      },
    }).$mount();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/public/mc/post_data.json', { headers: {} });
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
