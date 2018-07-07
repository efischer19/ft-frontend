import { mount } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import Blog from '@/views/Blog.vue';

const localPostData = require('@/mc_data.json');

describe('Blog', () => {
  it('should match snapshot', () => {
    const renderer = createRenderer();
    const wrapper = mount(
      Blog,
      {
        propsData: {
          baseImgDir: 'mc/',
          postContent: localPostData,
        },
      },
    );

    renderer.renderToString(
      wrapper.vm,
      (err, str) => {
        if (err) throw new Error(err);
        expect(str).toMatchSnapshot();
      },
    );
  });
});
