import { createRenderer } from 'vue-server-renderer';
import mockAxios from 'jest-mock-axios';
import Vue from 'vue';

import Blog from '@/views/Blog.vue';
import router from '@/router';

const mockResponseObj = require('./post_data.json');

/*
 * I tried to get public and private tests both working in Blog.spec.js, but nothing I tried worked
 * Since this does work, I'm going to save my sanity and just copy the test file.
*/

describe('Blog', () => {
  it('should match snapshot for private post', () => {
    const Constructor = Vue.extend(Blog);
    const vm = new Constructor({
      router,
      propsData: {
        id: '_mc', // this line is the only difference for 'private' setup
      },
    }).$mount();

    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/post-data/mc',
      { headers: { Authorization: undefined, 'X-Api-Key': 'oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH' } },
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
