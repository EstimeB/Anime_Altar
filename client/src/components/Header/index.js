import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const styles = {
  header: {
    backgroundColor: 'orange',
  },
  hdr: {
    boxShadow: '5px 5px 7px rgb(151, 151, 143',
    height: '130px',
    paddingLeft: '10px',
    paddingTop: '0.01px'

  },
  titlebox: {
    // paddingBottom: 'px'
  },
  title: {
    textDecoration: 'none',
    color: 'beige',
    
  },
  navLinks: {
    color: 'beige',
    float: 'right',
    marginRight: '15px'
  },
  login: {
    textDecoration: 'none',
    color: 'beige',
  },
  sigup: {
    textDecoration: 'none',
    color: 'beige',
  },
}

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header style={styles.header}>
      <div style={styles.hdr}>
        <div style={styles.titlebox}>
          <Link style={styles.title} to="/">
            <h1 >Anime Alter</h1>
          </Link>
          <p></p>
        </div>
        <div style={styles.navLinks}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                {Auth.getDashboard().data.username}'s dashboard
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link style={styles.login} to="/login">
                Login
              </Link>/
              <Link style={styles.sigup} to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
