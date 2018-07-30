import { createRenderer } from 'vue-server-renderer';
import mockAxios from 'jest-mock-axios';
import Vue from 'vue';

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

    // public/private can happen in either order, either will suffice here
    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      { headers: { Authorization: '', 'X-Api-Key': '' } },
    );
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
