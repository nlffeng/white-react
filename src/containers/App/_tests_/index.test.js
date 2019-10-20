import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';

import App from '../index';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });
});
