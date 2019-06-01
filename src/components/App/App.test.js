import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state for MenuShown', () => {
    expect(wrapper.state('menuShown')).toBe(false);

    wrapper.instance().toggleMenu();

    expect(wrapper.state('menuShown')).toBe(true);
  });

  it('should match snapshot if menuShown is true', () => {
    wrapper.setState({ menuShown: true });

    expect(wrapper).toMatchSnapshot();
  });
});

