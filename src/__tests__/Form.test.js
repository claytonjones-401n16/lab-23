import React from 'react';

import { shallow, mount, render } from 'enzyme';

import Form from '../components/Form';

describe('Form', () => {
  it('input exists', () => {
    let component = shallow(<Form />);
    let input = component.find('#url');
    
    expect(input).toBeDefined();
    expect(input.text()).toBe('');
  });

  it('buttons exist', () => {
    let component = shallow(<Form />);
    
    let buttons = component.find('button');
    expect(buttons).toBeDefined();
  })
});