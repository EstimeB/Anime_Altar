import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main style = {styles.oldpost}>
      <div>
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
      <div></div>
    </main>
  );
};
const styles = {
  oldpost: {
    height: '750px',
    width: '65%',
    marginLeft: '20px',
    boxShadow: '5px 5px 7px rgb(151, 151, 143)',
    background: 'rgb(248, 220, 164)',
    marginTop: '55px',
    textShadow: '5px 5px 7px rgb(151, 151, 143)',
  },
  postBox: {
    height: '150px', 
    margin: '15px',
    boxShadow: '5px 5px 7px orange',
  },

}

export default Home;
