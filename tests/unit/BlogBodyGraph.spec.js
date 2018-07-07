import { shallowMount } from '@vue/test-utils';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';

describe('BlogTitle.vue', () => {
  it('renders rawMsg without links', () => {
    const msg = 'test message';
    const wrapper = shallowMount(BlogBodyGraph, {
      propsData: {
        rawMsg: msg,
        links: {},
      },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it('renders rawMsg with links', () => {
    const msg = 'test message, link goes [[here]]!';
    const link = {
      here: {
        title: 'to a really cool website',
        href: 'http://127.0.0.1?q=cool_site',
      },
    };
    const expectedHtml = '<p>test message, link goes <a href="http://127.0.0.1?q=cool_site">to a really cool website</a>!</p>';

    const wrapper = shallowMount(BlogBodyGraph, {
      propsData: {
        rawMsg: msg,
        links: link,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });
});
