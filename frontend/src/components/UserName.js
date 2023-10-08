import React from 'react';
import { Link } from 'react-router-dom';

function UserName({ firstName }) {
  return (
    <Link to="/user" className="main-nav-item">
      <i className="fa fa-user-circle"></i>
      <span className="user-action">{firstName}</span>
    </Link>
  );
}

export default UserName;
