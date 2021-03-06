import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 style={styles.h4T}>No Comments Yet</h3>;
  }

  return (
    <>
      <h3 style={styles.letstalk}>
        Comments
      </h3>
      <div>
        {comments &&
          comments.map((comment) => (
            <div style={styles.plCard} key={comment._id}>
              <div>
                <p style={styles.pDes}>{comment.commentDescription}</p>
                <span style={styles.postBy}> posted by {comment.commentAuthor} on {comment.createdAt} </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const styles = { 
  plCard: {
    height: '150px', 
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
  },
  postBy: {
    float: 'right',
    marginRight:'20px',
  },
  pDes: {
    paddingTop: '40px',
    paddingBottom: '40px',
    margin: '15px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  letstalk: {
    textAlign: 'center',
    paddingTop: '25px',
    fontSize: '20px',
  },
  h4T: {
    paddingTop: '20px',
    marginLeft: '20px',
  },
}

export default CommentList;
