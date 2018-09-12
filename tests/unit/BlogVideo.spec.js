import { shallowMount } from '@vue/test-utils';
import BlogVideo from '@/components/BlogVideo.vue';

describe('BlogVideo.vue', () => {
  it('renders props from public video', () => {
    const link = { public: '20180707_test_video.jpg' };
    const alt = 'a totally real and not at all made up video';
    const id = 'mc';
    const expectedHtml = `<div class="video-with-link"><div class="div-around-video"><video width="auto" height="auto" controls="controls"><source src="/api/public/mc/20180707_test_video.jpg"></video></div> <a href="/api/public/mc/20180707_test_video.jpg">
    Click here for a higher-resolution version of this video
  </a></div>`;

    const wrapper = shallowMount(BlogVideo, {
      propsData: {
        fileLinks: link,
        altText: alt,
        postId: id,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });

  it('renders props from private video', () => {
    const links = {
      small: 'https://presigned.by.aws/totally_real/20180707_test_video.small.jpg',
      large: 'https://presigned.by.aws/totally_real/20180707_test_video.jpg',
    };
    const alt = 'a totally real and not at all made up video';
    const id = 'mc';
    const expectedHtml = `<div class="video-with-link"><div class="div-around-video"><video width="auto" height="auto" controls="controls"><source src="https://presigned.by.aws/totally_real/20180707_test_video.small.jpg"></video></div> <a href="https://presigned.by.aws/totally_real/20180707_test_video.jpg">
    Click here for a higher-resolution version of this video
  </a></div>`;

    const wrapper = shallowMount(BlogVideo, {
      propsData: {
        fileLinks: links,
        altText: alt,
        postId: id,
      },
    });
    expect(wrapper.html()).toMatch(expectedHtml);
  });
});
