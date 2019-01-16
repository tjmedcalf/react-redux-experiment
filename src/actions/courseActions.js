import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}
export function updateCourseSucces(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}
export function createCoursesSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

//THUNKS
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());

    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSucces(savedCourse)):
        dispatch(createCoursesSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
