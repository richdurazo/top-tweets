import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

configure({ adapter: new Adapter() });

const setUp = () => {
    const wrapper = shallow(<App />);
    return wrapper
}

describe('App', () => {

  test('should render', () => {
    const component = setUp();
    expect(component.exists()).toBeTruthy()
  });

  it('should render correctly in "debug mode"', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });
  
});