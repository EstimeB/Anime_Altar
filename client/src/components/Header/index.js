import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const styles = {
  header: {
    backgroundColor: "orange",
    textShadow: "5px 5px 7px rgb(151, 151, 143)",
  },
  hdr: {
    boxShadow: "5px 5px 7px rgb(151, 151, 143)",
    height: "130px",
    paddingLeft: "10px",
    paddingTop: "0.01px",
  },
  // titlebox: {
    // paddingBottom: 'px'
  // },
  title: {
    textDecoration: "none",
    color: "beige",
  },
  navLinks: {
    color: "rgb(81, 53, 119",
    float: "right",
    marginRight: "15px",
  },
  login: {
    textDecoration: "none",
    color: "rgb(81, 53, 119",
    fontSize: '20px',
  },
  signup: {
    textDecoration: "none",
    color: "rgb(81, 53, 119",
    fontSize: '20px',
  },
  link4: {
    // color: '',
    textDecoration: 'none',
    fontSize: '20px',
  },
  logoutBtn: {
    border: 'none',
    backgroundColor: "orange",
    fontSize: '20px',
    color: 'rgb(81, 53, 119',
  },
};

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
            <h1>Anime Altar</h1>
          </Link>
          <p></p>
        </div>
        <div style={styles.navLinks}>
          {Auth.loggedIn() ? (
            <>
              <Link style={styles.link4} to="/">Home</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Link style={styles.link4} to="/me">{Auth.getProfile().data.username}'s Dasboard</Link>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button style={styles.logoutBtn} onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link style={styles.login} to="/login">
                Login
              </Link>
              /
              <Link style={styles.signup} to="/signup">
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
