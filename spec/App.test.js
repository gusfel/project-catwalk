import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from '../client/src/App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
});
