import { shallowMount } from '@vue/test-utils';
import BlogHeader from '@/components/BlogHeader.vue';

describe('BlogHeader.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'test message';
    const wrapper = shallowMount(BlogHeader, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
