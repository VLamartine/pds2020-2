import { mount } from 'enzyme';

import Card from 'react-bootstrap/Card';
import React from 'react';
import List from './List';

import recipesMock from '../../../recipesMock.json';
import CardList from '../../UX/CardList/CardList';


describe('<List />', () => {
  let component, useStateSpy, fetchSpy, setRecipes;
  const data = recipesMock.data;

  beforeEach(() => {
    setRecipes = jest.fn();

    useStateSpy = jest.spyOn(React, 'useState');
    fetchSpy = jest.spyOn(window, 'fetch');
    useStateSpy.mockImplementationOnce(init => [init, setRecipes]);
    fetchSpy.mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data
        })
      })
    })
    component = mount(
      <List/>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the card list with all the recipes', () => {
    expect(component.find(CardList)).toHaveLength(1);
  });

  it('should handle filter changes', () => {
    const input = component.find('#filter').at(0);

    input.value = 'mousse';

    input.simulate('change');

    expect(setRecipes).toHaveBeenCalled();
  });

  // it('should handle ingredients changes', () => {
  //   const input = component.find('#ingredients').at(0);

  //   input.value = '500 ml de água';

  //   input.simulate('change');

  //   expect(setFormData).toHaveBeenCalled();
  // });

  // it('should handle howTo changes', () => {
  //   const input = component.find('#howto').at(0);

  //   input.value = 'Ferva a água';

  //   input.simulate('change');

  //   expect(setFormData).toHaveBeenCalled();
  // });
});