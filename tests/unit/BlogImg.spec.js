import { shallowMount } from '@vue/test-utils';
import BlogImg from '@/components/BlogImg.vue';

describe('BlogImg.vue', () => {
  it('renders props from public image', () => {
    const link = '20180707_test_image.jpg';
    const alt = 'a totally real and not at all made up image';
    const id = 'mc';
    const expectedHtml = '<a href="/api/public/mc/20180707_test_image.jpg"><img src="/api/public/mc/20180707_test_image.small.jpg" alt="a totally real and not at all made up image"> <div class="hidden">Click for high-resolution image</div></a>';

    const wrapper = shallowMount(BlogImg, {
      propsData: {
        baseFileLink: link,
        altText: alt,
        postId: id,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });

  it('renders props from private image', () => {
    const link = 'https://presigned.by.aws/totally_real/20180707_test_image.jpg';
    const alt = 'a totally real and not at all made up image';
    const id = 'mc';
    const expectedHtml = '<a href="https://presigned.by.aws/totally_real/20180707_test_image.jpg"><img src="https://presigned.by.aws/totally_real/20180707_test_image.small.jpg" alt="a totally real and not at all made up image"> <div class="hidden">Click for high-resolution image</div></a>';

    const wrapper = shallowMount(BlogImg, {
      propsData: {
        baseFileLink: link,
        altText: alt,
        postId: id,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });
});
