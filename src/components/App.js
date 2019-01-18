import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import HomePage from "./home/HomePage";
import CoursesPage from "./course/CoursesPage";
import AboutPage from "./about/AboutPage";
import ManageCoursePage from "./course/ManageCoursePage";
import AuthorsPage from "./author/AuthorPage";
import ManageAuthorPage from "./author/ManageAuthorPage";
import { NavLink, Switch, Route, withRouter } from "react-router-dom";
import LoadingDots from '../components/common/LoadingDots';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <nav>
          <div>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            {" | "}
            <NavLink to="/courses" activeClassName="active">Courses</NavLink>
            {" | "}
            <NavLink to="/authors" activeClassName="active">Manage Authors</NavLink>
            {" | "}
            <NavLink to="/about" activeClassName="active">About</NavLink>
            {/*{loading && <LoadingDots interval={100} dots={20}/>}*/}
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/courses" component={CoursesPage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/course" component={ManageCoursePage}/>
          <Route path="/course/:id" component={ManageCoursePage}/>
          <Route path="/authors" component={AuthorsPage}/>
          <Route path="/authors/:id" component={ManageAuthorPage}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(App));
