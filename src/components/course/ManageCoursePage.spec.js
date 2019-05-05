import React from 'react';
import {shallow, mount} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';


describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      course: {id: "", watchHref:"", title:"", authorId: "", category: "", length: ""},
      authors: [],
      actions: {
        saveCourse: () => Promise.resolve()
      }
    };

    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');

    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters'); 
  });
});
