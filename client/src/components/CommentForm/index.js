import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ postId }) => {
  const [commentDescription, setCommentDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
    //   const { data } =
       await addComment({
        variables: {
          postId,
          commentDescription,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentDescription' && value.length <= 280) {
      setCommentDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4 style={styles.letstalk}>What are your thoughts on this post?</h4>

      {Auth.loggedIn() ? (
        <>
        <div style={styles.pfCard}>

          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span>{error.message}</span>}
          </p>
          <form
            onSubmit={handleFormSubmit}
          >
            <div style={styles.textBox}>
              <div style={styles.createPt}>Leave a Comment</div>

                  <textarea
                    name="commentDescription"
                    placeholder="Add your comment..."
                    value={commentDescription}              
                    style={styles.postText}
                    onChange={handleChange}
                  ></textarea>
              </div>
              <div style={styles.btnDiv}>
                <button style={styles.btn} type="submit">
                  Add Comment
                </button>
              </div>
          </form>
        </div>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

const styles = {
  pfCard: {
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
    marginBottom: '50px',
    height: '100%',
  },
  letstalk: {
    textAlign: 'center',
    paddingTop: '25px',
    fontSize: '30px',
  },
  textBox: {
    paddingTop: '20px',
    paddingBottom: '30px',
    // border: 'solid',
    marginLeft: '100px',
    marginRight: '100px',
  },
  createPt: {
    fontSize: '25px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  btnDiv: {
    textAlign: 'center',
  },
  postText: {
    width: '100%',
    height: '100px',
    background: 'beige',
    boxShadow: '5px 5px 7px rgb(151, 151, 143)',
    marginBottom: '-10px',
  },
  btn: {
    // border: 'none',
    background: 'orange',
    width: '105px',
    height: '35px',
    boxShadow: '5px 5px 7px rgb(151, 151, 143)',
    marginBottom: '50px',
  },
}

export default CommentForm;