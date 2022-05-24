import React from "react";
import { Link } from "react-router-dom";

const PostList = ({
  posts,
  postTitle,
  postUser,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>No posts Yet</h3>;
  }

  return (
    <div style={styles.thePost}>
      {showTitle && <h3>{postTitle}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            {/* {showUsername && <h4 style={styles.textA}>
              posted by {postUser}, {post.createdAt}
              </h4>} */}
            <h4>
              {showUsername ? (
                <Link
                  style={styles.textLight}
                  to={`/userSpace/${post.postUser}`}
                >
                  {post.postUser}
                  <span style={styles.pdate}>posted by {post.createdAt}</span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    posted by {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div>
              <p style={styles.p}>{post.postDescription}</p>
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
