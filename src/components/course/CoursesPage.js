import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {push} from 'connected-react-router';


class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  deleteCourse() {
    //console.log('delete course called..');
  }

  redirectToAddCoursePage() {
    this.props.actions.push('/course');
    return false;
  }

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <button className={"btn btn-primary"} onClick={this.redirectToAddCoursePage}>Add Course</button>
        <CourseList deleteCourse={this.deleteCourse} courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mappers = {
  stateToProps: state => ({courses: state.courses}),
  dispatchToProps: dispatch => ({actions: bindActionCreators(Object.assign({}, courseActions, {push}), dispatch)})
};

export default connect(mappers.stateToProps, mappers.dispatchToProps)(CoursesPage);
