import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorListRow = ({author, handleDelete}) => {
    const {lastName, firstName, id, courses} = author;
  
    return (
        <tr>
        <td><button className="btn btn-danger">Delete</button> <Link className="btn btn-info" to={`/author/${id}`}>Edit</Link></td>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{courses.length}</td>
        </tr>
    );
};

AuthorListRow.propTypes = {
    author: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
