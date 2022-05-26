import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_POST } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  const [removePost, { error }] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removePost },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemovePost = async (post) => {
    try {
      // const { data } = 
      await removePost({
        variables: { post },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!posts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id}  style={styles.plCard}>
            <p style={styles.pTitle}>
              {showUsername ? (
                <Link style={styles.link4} to={`/profiles/${post.postAuthor}`}>
                  <h4 style={styles.h4T}>{post.postTitle}</h4>
                </Link>
              ) : (
                <>
                  <ul style={styles.ul}>
                  <li style={styles.li}><h4>{post.postTitle}</h4></li>
                    <li style={styles.dngBtn}><button onClick={() => handleRemovePost(post)}>X_X</button></li>

                  </ul>
                </>
              )}
            </p>
            <div>
              <p style={styles.pDes}>{post.postDescription}</p>
              {/* posted by {post.postAuthor} on */}
              <span style={styles.postBy}>posted by {post.postAuthor} on {post.createdAt}</span>
            </div>
            <Link to={`/posts/${post._id}`}></Link>
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

