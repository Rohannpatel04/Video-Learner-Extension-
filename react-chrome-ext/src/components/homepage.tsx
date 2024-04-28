import React, { useState } from "react";
import '../css/homepage.css';
import { runConvert } from "./html_to_txt";

function Homepage() {
  // state for max and min video durations in minutes
  const [maxVideoDuration, setMaxVideoDuration] = useState(0);
  const [minVideoDuration, setMinVideoDuration] = useState(0);

  // function to convert minutes to seconds
  const convertToSeconds = (minutes: number) => {
    return minutes * 60;
  };

  // submit button
  const handleSubmit = async () => {
    if (maxVideoDuration <= 0)  {
      alert("Please enter at least maximum video durations.");
      return;
    } else if (minVideoDuration > maxVideoDuration){
      alert("Please enter a minimum video duration that is less than the maximum video duration");
      return;
    }

    // to store url
    let currentTabUrl = null;
    
    // getting current window url
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]?.url) {
        currentTabUrl = tabs[0].url;
        // display url in an alert for testing
        //alert("Current tab URL: " + currentTabUrl);
        // call jaxons script
        const text = runConvert(currentTabUrl, 1, 10);
        alert('YouTube URL' + text);
      }
    });
  };    

  // JSX for displaying in the popup
  return (
    <div className="popup-window">
      <div className="title-container">
        <h2 className="title">Video Learner</h2>
      </div>
      <div className="time-input-container">
          <div className="time-dropdown-container">
            <label className="min-video-duration-label">
              Min Video Duration (mins):{" "}
              <input
                type="number"
                value={minVideoDuration}
                onChange={(e) => setMinVideoDuration(parseInt(e.target.value))}
                min="0"
                // 24 hours in minutes
                max="1440" 
                className="min-video-duration-input"
              />
            </label>
            <label className="max-video-duration-label">
              Max Video Duration (mins):{" "}
              <input
                type="number"
                value={maxVideoDuration}
                onChange={(e) => setMaxVideoDuration(parseInt(e.target.value))}
                min="0"
                className="max-video-duration-input"
              />
            </label>
          </div>
      </div>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

}

export default Homepage;
