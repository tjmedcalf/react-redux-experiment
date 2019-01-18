import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving = false) {
  const props = {
    course: {}, loading: saving, errors: {},
    onSave: ()=>{},
    onChange: ()=>{},
    allAuthors: []
  };

  return shallow(<CourseForm {...props}/>);
}

describe('CourseForm via Enzyme', () => {
  it('renders form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find("input").props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when not saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find("input[type='submit']").props().value).toBe('Saving...');
  });
});

