import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let toggleMenu;
  let menuShown;
  let wrapper;

  beforeEach(() => {
    toggleMenu = jest.fn();
    menuShown = jest.fn();
    wrapper = shallow(
      <Header 
        toggleMenu={toggleMenu} 
        menuShown={menuShown} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle search bar', () => {
    expect(wrapper.state('searchShown')).toBe(false);

    wrapper.instance().toggleSearch();

    expect(wrapper.state('searchShown')).toBe(true);
  });

  it('should match snapshot if searchShown is true', () => {
    wrapper.setState({ searchShown: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should open menu drawer when hamburger btn is clicked', () => {
    wrapper.find('.hamburger-icon').simulate('click');

    expect(toggleMenu).toHaveBeenCalled();
  });

  it('should show search bar when search btn is clicked', () => {
    expect(wrapper.state('searchShown')).toEqual(false);

    wrapper.find('.search-icon').simulate('click');

    expect(wrapper.state('searchShown')).toEqual(true);
  });
});