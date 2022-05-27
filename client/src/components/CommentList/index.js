import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3>
        Comments
      </h3>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <div>
                <h5>
                  {comment.commentAuthor} commented{' '}
                  <span>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p></p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
