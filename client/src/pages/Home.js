import React from "react";
import { useQuery } from "@apollo/client";

import PostList from "../components/PostList";

import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main style={styles.lineDiv}>
      <div style={styles.oldpost}>
        <div style={styles.postl}>
          {loading ? <div>Loading...</div> : <PostList posts={posts} />}
        </div>
      </div>
      <div style={styles.sidePict}></div>
    </main>
  );
};
const styles = {
  oldpost: {
    height: "750px",
    width: '65%',
    marginLeft: "30px",
    boxShadow: "5px 5px 7px rgb(151, 151, 143)",
    background: "rgb(248, 220, 164)",
    textShadow: "5px 5px 7px rgb(151, 151, 143)",
    overflowY: "scroll",
    marginTop: "40px",
    marginBottom: "40px",
  },
  postl: {
    marginBottom: "50px",
  },
  lineDiv: {
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "space-between",
  },
  sidePict: {
    height: "750px",
    width: '35%',
    marginLeft: "20px",
    boxShadow: "5px 5px 7px rgb(151, 151, 143)",
    background: "rgb(248, 220, 164)",
    textShadow: "5px 5px 7px rgb(151, 151, 143)",
    overflowY: "scroll",
    marginTop: "40px",
    marginBottom: "40px",
  },
};

export default Home;
