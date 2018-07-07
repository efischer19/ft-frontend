import { shallowMount } from '@vue/test-utils';
import BlogTitle from '@/components/BlogTitle.vue';

describe('BlogTitle.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'test message';
    const wrapper = shallowMount(BlogTitle, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
