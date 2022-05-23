import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer style={styles.team}>
      <div>
        {location.pathname !== "/" && (
          <button style={styles.submitBtn} onClick={() => navigate(-1)}>&larr; Go Back</button>
        )}
        <h4 style={styles.teamL}>Team 5Hands©</h4>
      </div>
    </footer>
  );
};
const styles = {
  team: {
    display: "flex",
    justifyContent: "center",
    textShadow: "1px 1px  rgb(248, 220, 164)",
  },
  teamL: {
    backgroundColor: "rgb(248, 237, 209)",
    width: "110px",
    paddingLeft: '3px',
    
  },
  submitBtn: {
    backgroundColor: 'rgb(243, 225, 179)',
  },
};

export default Footer;
