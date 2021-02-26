import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from '../client/src/App';

configure({ adapter: new Adapter() });

// it('renders without crashing', () => {
//   // const wrapper = shallow(<App />);

// });

describe('Sample test', () => {
  it('string', () => {
    const wrapper = shallow(<App />);
    const word = wrapper.find('h1').text();
    expect(word).toHaveText('GANG GANG');
  });
});
