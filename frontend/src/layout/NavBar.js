import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../components/Logout';

function NavBar() {
  const token = useSelector(state => state.user.token);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Display the LogoutButton component if the user is logged in, else display the Sign In button */}
        {token ? (
          <LogoutButton />
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            <span className="user-action">
            Sign In
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
