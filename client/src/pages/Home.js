import React from "react";
import { useQuery } from "@apollo/client";

import PostList from "../components/PostList";

import { QUERY_POSTS } from "../utils/queries";

import img3 from ".././images/naruto.jpg";
import img4 from ".././images/kame.png";
import img5 from ".././images/one piece.jpg";
import img6 from ".././images/gundum.png";
import img7 from ".././images/jojo.jpg";
import img8 from ".././images/attack.jpg";

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
      <div style={styles.sidePict}>
      <img style={styles.img3} src={img6} alt="anime" />
      <img style={styles.img3} src={img4} alt="kame" />
      <img style={styles.img3} src={img3} alt="naruto" />
      <img style={styles.img3} src={img5} alt="one piece" />
      <img style={styles.img3} src={img7} alt="jojo" />
      <img style={styles.img3} src={img8} alt="attack" />
      </div>
    </main>
  );
};
const styles = {
  oldpost: {
    height: "750px",
    width: '75%',
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
    marginRight: "30px",
    marginLeft: "30px",
  },
  sidePict: {
    height: "750px",
    width: '25%',
    marginLeft: "20px",
    boxShadow: "5px 5px 7px rgb(151, 151, 143)",
    background: "rgb(248, 220, 164)",
    textShadow: "5px 5px 7px rgb(151, 151, 143)",
    overflowY: "scroll",
    marginTop: "40px",
    marginBottom: "40px",
  },
  img3: {
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
    height: '300px',
    width: '100%',
  },
  img4: {
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
    marginBottom: '50px',
    height: '300px',
    // width: '240px',
  }
};

export default Home;
