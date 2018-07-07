import { shallowMount } from '@vue/test-utils';
import BlogList from '@/components/BlogList.vue';

describe('BlogList.vue', () => {
  it('renders props.items when passed', () => {
    const items = [
      'test 1',
      'test 2',
      'test 3',
    ];
    const expectedHtml = '<ul><li>test 1</li><li>test 2</li><li>test 3</li></ul>';
    const wrapper = shallowMount(BlogList, {
      propsData: { items },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });
});
