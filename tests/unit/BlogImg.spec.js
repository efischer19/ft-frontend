import { shallowMount } from '@vue/test-utils';
import BlogImg from '@/components/BlogImg.vue';

describe('BlogImg.vue', () => {
  it('renders props when passed', () => {
    const link = '20180707_test_image.jpg';
    const alt = 'a totally real and not at all made up image';
    const expectedHtml = '<a href="20180707_test_image.jpg"><img src="20180707_test_image.small.jpg" alt="a totally real and not at all made up image"> <div class="hidden">Click for high-resolution image</div></a>';

    const wrapper = shallowMount(BlogImg, {
      propsData: {
        baseFileLink: link,
        altText: alt,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });
});
