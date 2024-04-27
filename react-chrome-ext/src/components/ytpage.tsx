import React from "react";
import '../css/ytpage.css';

function Ytpage() {
  // JSX for displaying in the popup
  return (
    <div className="popup-window">
      <div className="title-container">
        <h2 className="title">Video Learner</h2>
      </div>
      <div className="display-links-container">
        <h2 className="display-links-heading">Here are the related YouTube videos</h2> 
        <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer" className="a">Visit the youtube video</a>
      </div>
    </div>
  );
}

export default Ytpage;
