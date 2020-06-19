import React from 'react';

import { shallow } from 'enzyme';

import History from '../components/History';
import Sidebar from '../components/Sidebar'

describe('History page', () => {
  it('looks as expected', () => {
    let component = shallow(<History history={[]}/>);
    expect(component.find('#history')).toBeDefined();
    expect(component.find('#history-list')).toBeDefined();
  })
})

describe('History side bar', () => {
  it('looks as expected', () => {
    let component = shallow(<Sidebar history={[]}/>);
    expect(component.find('#sidebar-container')).toBeDefined();
    expect(component.find('#sidebar-list')).toBeDefined();
    expect(component.find('#sidebar-content')).toBeDefined();
  })
})