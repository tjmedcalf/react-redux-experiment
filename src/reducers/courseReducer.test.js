import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: "A"},
      {title: "B"}
    ];

    const newCourse = {title: "C"};

    const action = actions.createCoursesSuccess(newCourse);

    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");

    expect(newState).toEqual([...initialState, newCourse]);
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      {id:"a", title: "A"},
      {id:"b", title: "B"}
    ];

    const course = {id:"a", title: "C"};

    const action = actions.updateCourseSucces(course);

    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(row => row.id == course.id);
    const unalteredCourse = newState.find(row => row.id == "b");

    expect(unalteredCourse.title).toEqual("B");
    expect(updatedCourse.title).toEqual("C");
    expect(newState.length).toEqual(2);
  });
});
