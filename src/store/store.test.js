import expect from 'expect';
import {createStore} from "redux";
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = {id: "clean-code", title: "Clean Code"};

    //act
    const action = courseActions.createCoursesSuccess(course);
    store.dispatch(action);

    //assert
    const actual = store.getState().courses[0];
    const expected = {id: "clean-code", title: "Clean Code"}

    expect(actual).toEqual(expected);
  });
});
