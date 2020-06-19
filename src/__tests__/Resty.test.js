import React from 'react';

import { mount } from 'enzyme';

import Resty from '../components/Resty';


describe('Resty', () => {
  it('lets user add url', () => {
    let resty = mount(<Resty />);

    resty.find('#url').simulate('change', {target: {value: 'test'}});
    expect(resty.state('reqURL')).toBe('test');
    expect(resty.find('#url').props().value).toBe('test');
  });

  it('buttons can be clicked to change state', () => {
    let resty = mount(<Resty />);

    expect(resty.state('reqType')).toBe('GET');
    expect(resty.find('.selected').text()).toBe('GET');

    let notSelected = resty.find('.not-selected');
    notSelected.forEach(button => {
      button.simulate('click');
      expect(resty.state('reqType')).toBe(button.text());
    });
  });

  it('results form renders content on submit', async () => {
    let resty = mount(<Resty />);

    resty.find('#url').simulate('change', {target: {value: 'https://www.dnd5eapi.co/api/classes'}});

    expect(resty.find('#url').props().value).toBe('https://www.dnd5eapi.co/api/classes');
    
    await resty.find('.submit').simulate('click');

    expect(resty.find('.results')).toBeDefined();
  });

  it('changes state on body input', () => {
    let resty = mount(<Resty />);

    let body = resty.find('#req-body');
    expect(body.props().value).toBe('');
    expect(resty.state('reqBody')).toBe('');
    body.simulate('change', {target: {value: 'test'}});
    expect(body.props().value).toBe('');
    expect(resty.state('reqBody')).toBe('test');
  });

  it('changes state on header input', () => {
    let resty = mount(<Resty />);

    let body = resty.find('#req-headers');
    expect(body.props().value).toBe('');
    expect(resty.state('reqHeaders')).toBe('');
    body.simulate('change', {target: {value: 'test'}});
    expect(body.props().value).toBe('');
    expect(resty.state('reqHeaders')).toBe('test');
  });
});