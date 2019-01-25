import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;

    return this.setState({course: course});
  }

  redirect() {
    this.setState({saving: false});
    toastr.success("course saved!");
    this.context.router.history.push('/courses');
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
      formIsValid = false;
    }

    this.setState({errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <div>
        <h1>Manage Course </h1>

        <CourseForm
          loading={this.state.saving}
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
          allAuthors={this.props.authors}
          errors={this.state.errors}
          course={this.state.course} />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if(course.length) return course[0];
  return null;
}

const mappers = {
  stateToProps: (state, ownProps) => {
    const courseId = ownProps.match.params.id;
    let course = {id: "", watchHref:"", title:"", authorId: "", category: "", length: ""};

    if(courseId && state.courses.length > 0) {
      course = getCourseById(state.courses, courseId);
    }

    return {
      course,
      authors: authorsFormattedForDropdown(state.authors)
    };
  },
  dispatchToProps: dispatch => {
    return {
      actions: bindActionCreators(courseActions, dispatch)
    };
  }
};

export default connect(mappers.stateToProps, mappers.dispatchToProps)(ManageCoursePage);
