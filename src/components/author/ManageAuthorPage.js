import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authorActions';

export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h1>Manage Author</h1>
        
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  //myProp: PropTypes.string.isRequired,
};

const mappers = {
  stateToProps: (state) => ({authors: state.authors}),
  dispatchToProps: dispatch => {
    return {
    actions: bindActionCreators(actions, dispatch)
  };
}
};

export default connect(mappers.stateToProps, mappers.dispatchToProps)(ManageAuthorPage);
