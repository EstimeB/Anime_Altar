import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main style={styles.lmain}>
      <div>
        <div style={styles.card}>
          <h4>Login</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                Email
                <br></br>
                <input
                  style={styles.input}
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <br></br>
                Password
                <br></br>
                <input
                  style={styles.input}
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <button
                  style={styles.submitBtn}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const styles = {
  lmain: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  card: {
    boxShadow: '5px 5px 7px rgb(151, 151, 143)',
    width: '300px',
    marginTop: '150px',
    // background: 'rgb(246, 231, 204)',
    backgroundColor: 'orange',
    paddingBottom: '20px',
    paddingTop: '7px',
    marginBottom: '25px'
  },
  input: {
    height: '20px',
    backgroundColor: 'rgb(243, 225, 179)',
  },
  submitBtn: {
    backgroundColor: 'rgb(243, 225, 179)',
  }
}

export default Login;
