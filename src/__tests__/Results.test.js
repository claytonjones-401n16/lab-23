import React from 'react';

import { shallow, mount, render } from 'enzyme';

import Results from '../components/Results';

describe('Results', () => {
  it('results field exists', () => {
    let component = shallow(<Results />);
    expect(component.find('.results')).toBeDefined();
    expect(component.find('.results > pre')).toBeDefined();
  });
});