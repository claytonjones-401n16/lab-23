import React from 'react';

import { shallow, mount, render } from 'enzyme';

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

  it('results form renders content on submit', () => {
    let resty = mount(<Resty />);
    let fetchSpy = jest.spyOn(resty.instance(), 'fetchAPI');

    resty.find('#url').simulate('change', {target: {value: 'https://www.dnd5eapi.co/api/classes'}});

    expect(resty.find('#url').props().value).toBe('https://www.dnd5eapi.co/api/classes')

    resty.find('.submit').simulate('click');

    expect(fetchSpy).toHaveBeenCalled();
  });
});