import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main style={styles.smain}>
      <div>
        <div style={styles.card}>
          <h4>Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                Username
                <br></br>
                <input
                  style={styles.input}
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <br></br>
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
  smain: {
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

export default Signup;
