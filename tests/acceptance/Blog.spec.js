import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';
import mockAxios from 'jest-mock-axios';
import Blog from '@/views/Blog.vue';

const mockResponseObj = require('./post_data.json');

describe('Blog', () => {
  it('should match snapshot', () => {
    const Constructor = Vue.extend(Blog);
    const vm = new Constructor({
      propsData: {
        id: 'mc',
      },
    }).$mount();

    expect(mockAxios.get).toHaveBeenCalledWith('/mc/post_data.json');
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
