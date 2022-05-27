import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div  style={styles.dashCard}>
      <h3>
      <h4>{post.postTitle}</h4>
        <span>posted by {post.postAuthor} on {post.createdAt}</span>
      </h3>
      <div>
        <blockquote>
          {post.postDescription}
        </blockquote>
      </div>

      <div>
        <CommentList comments={post.comments} />
      </div>
      <div>
        <CommentForm postId={post._id} />
      </div>
    </div>
  );
};

const styles = {
  dashCard: {
    height: '750px',
    marginLeft: '50px',
    marginRight: '50px',
    boxShadow: '5px 5px 7px rgb(151, 151, 143)',
    background: 'rgb(248, 220, 164)',
    marginTop: '40px',
    marginBottom: '40px',
    textShadow: '5px 5px 7px rgb(151, 151, 143)',
    overflowY: 'scroll',
  },
  h2H: {
    textAlign: 'center',
  }
}

export default SinglePost;
