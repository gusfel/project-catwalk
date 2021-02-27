/* eslint-disable import/no-extraneous-dependencies */

/** Used in jest.config.js */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/index.jsx'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
});