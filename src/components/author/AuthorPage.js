import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authorActions';
import AuthorList from './AuthorList';

class AuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(authorId) {
    console.log(authorId);
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <AuthorList authors={this.props.authors} />
      </div>
    );
  }
}

AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
};

const mappers = {
  stateToProps: (state, ownProps) => {
    let authors = state.authors.map(author => {
      let courses = state.courses.filter(course => course.authorId == author.id);
      return Object.assign({}, author, {courses});
    });
    
    return {
      authors
    };
  },
  dispatchToProps: dispatch => {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
};

export default connect(mappers.stateToProps, mappers.dispatchToProps)(AuthorPage);
