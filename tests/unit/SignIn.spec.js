import { shallowMount } from '@vue/test-utils';

import SignIn from '@/components/SignIn.vue';

describe('SignIn.vue', () => {
  it('renders when empty', () => {
    const expectedHtml = '<div id="signin-header"><p>You are not signed in</p> <a href="https://signin.fischerthings.com/login?response_type=token&amp;client_id=6a8t6a9st8fqkbt81n9mtb2aag&amp;redirect_uri=https://fischerthings.com/login_success.html">Sign In</a></div>';
    const wrapper = shallowMount(SignIn);
    expect(expectedHtml).toMatch(wrapper.html());
  });

  it('renders when token exists, and allows sign-out', () => {
    sessionStorage.setItem('ft-auth-token', `${Date.now() + 20000}|this_portion_doesnt_matter_in_tests.this_part_does_but_I_want_to_test_error_handling_too.this_also_does_not_matter`);
    const expectedHtml = '<div id="signin-header"><p>Hello Signed-In User!</p> <a href="/">Sign Out</a></div>';
    const wrapper = shallowMount(SignIn);
    expect(expectedHtml).toMatch(wrapper.html());

    const signout = wrapper.find('a');
    signout.trigger('click');
    expect(sessionStorage.__STORE__).toEqual(undefined); // eslint-disable-line no-underscore-dangle
    sessionStorage.clear();
  });

  it('renders correctly when token is expired', () => {
    sessionStorage.setItem('ft-auth-token', `${Date.now() - 20000}|this_portion_doesnt_matter_in_tests.this_part_does_but_I_want_to_test_error_handling_too.this_also_does_not_matter`);
    const expectedHtml = '<div id="signin-header"><p>You are not signed in</p> <a href="https://signin.fischerthings.com/login?response_type=token&amp;client_id=6a8t6a9st8fqkbt81n9mtb2aag&amp;redirect_uri=https://fischerthings.com/login_success.html">Sign In</a></div>';
    const wrapper = shallowMount(SignIn);
    expect(wrapper.html()).toMatch(expectedHtml);
    sessionStorage.clear();
  });
});
