import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

import Auth from '../../utils/auth';

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  
  const [postDescription, updatePostDescription] = useState('');
  const [postTitle, updatePostTitle] = useState('');
  
  const [removePost] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost } }) {
      try {
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { me: removePost },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, removePost] } },
      });
    },
  });

  const handleRemovePost = async (event, post) => {
    event.preventDefault();
    try {
      // const { data } = 
      await removePost({
        variables: {
          postDescription,
          postTitle,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      updatePostDescription('');
      updatePostTitle('');
    } catch (err) {
      console.error(err);
    }
  };
console.log(handleRemovePost);
  if (!posts.length) {
    return <h3 style={styles.h4T}>No posts Yet</h3>;
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id}  style={styles.plCard}>
            <div style={styles.pTitle}>
              {showUsername ? (
                <Link style={styles.link4} to={`/posts/${post._id}`}>
                  <h4 style={styles.h4T}>{post.postTitle}</h4>
                </Link>
              ) : (
                <>
                  <ul style={styles.ul}>
                  <li style={styles.li}><h4>{post.postTitle}</h4></li>
                    <li style={styles.dngBtn}><button onClick={handleRemovePost}>X_X</button></li>

                  </ul>
                </>
              )}
            </div>
            <div>
              <p style={styles.pDes}>{post.postDescription}</p>
              {/* posted by {post.postAuthor} on */}
              <span style={styles.postBy}>posted by {post.postAuthor} on {post.createdAt}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

const styles = {
  plCard: {
    height: '150px', 
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
  },
  pTitle: {
    background: 'orange',
    width: '100%',
    height: '65px',
  },
  postBy: {
    float: 'right',
    marginRight:'20px',
  },
  ul: {
    listStyleType: "none",
    marginLeft: '0px',
    marginRight: '2px',
  },
  li: {
    paddingTop: '2px',
    paddingBottom: '-20px',
  },
  dngBtn: {
    float: 'right',
    marginRight:'20px',
  },
  pDes: {
    margin: '15px',
  },
  h4T: {
    paddingTop: '20px',
    marginLeft: '20px',
  },
  link4: {
    // color: '',
    textDecoration: 'none',
  },
};

export default PostList;

