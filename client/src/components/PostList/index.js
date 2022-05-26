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
      const { data } = await removePost({
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
    <div style={styles.thePost}>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <p style={styles.textA}>
              {showUsername ? (
                <Link to={`/profiles/${post.postAuthor}`}>
                  <h4>{post.postTitle}</h4>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                  <h4>{post.postTitle}</h4>
                    <button onClick={() => handleRemovePost(post)}>X_X</button>

                  </span>
                </>
              )}
            </p>
            <div>
              <p style={styles.p}>{post.postDescription}</p>
              {/* posted by {post.postAuthor} on */}
              <span style={styles.pdate}>posted by {post.postAuthor} on{post.createdAt}</span>
            </div>
            <Link to={`/posts/${post._id}`}></Link>
          </div>
        ))}
    </div>
  );
};

const styles = {
  thePost: {
    fontSize: "25px",
    display: "flex",
  },
  textLight: {
    color: "black",
    textDecoration: "none",
    margin: "15px",
    display: "flex",
  },
  textA: {
    backgroundColor: "orange",
    height: "85px",
    display: "flex",
    border: "solid",
    marginBottom: "0px",
    borderColor: "gold",
    margin: "-0px",
  },
  pdate: {
    fontSize: "15px",
    marginLeft: "30px",
  },
  p: {
    fontSize: "20px",
    marginLeft: "10px",
    marginRigth: "10px",
  },
};

export default PostList;
