import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>No posts Yet</h3>;
  }

  return (
    <div style = {styles.thePost}>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} >
            <h4 style={styles.textA}>
              {showUsername ? (
                <Link
                  style={styles.textLight}
                  to={`/dashboard/${post.postTitle}`}
                >
                  {post.postTitle}
                  <span style={styles.pdate}>
                    posted by {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  {/* <span style={{ fontSize: '1rem' }}>
                    posted by {post.createdAt}
                  </span> */}
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p style={styles.p}>{post.postDescription}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/POSTS/${post._id}`}
            >
            </Link>
          </div>
        ))}
    </div>
  );
};

const styles = {

  thePost: {
    fontSize: '25px',

  },
  textLight: {
    color: 'beige',
    textDecoration: 'none',
    marginLeft: '10px',
    marginRigth: '10px'

  },
  textA: {
    backgroundColor: 'rgb(132, 87, 4)',
    height: '70px',
    border: 'solid',
    marginBottom: '-10px',
    borderColor: 'rgb(33, 54, 33)'
  },
  pdate: {
    fontSize: '15px',

    marginLeft: '30px'
  },
  p: {
    fontSize: '20px',
    marginLeft: '10px',
    marginRigth: '10px'
  }
}

export default PostList;