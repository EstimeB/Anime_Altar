import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main style = {styles.oldpost}>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PostForm />
        </div>
        <div style = {styles.postBox}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
            />
          )}
        </div>
      </div>
      <div>Checkout</div>
    </main>
  );
};
const styles = {
  oldpost: {
    height: '750px',
    numColumns: "2"
  },
  postBox: {
    height: '150px', 
    border: 'solid'

  }

}

export default Home;
