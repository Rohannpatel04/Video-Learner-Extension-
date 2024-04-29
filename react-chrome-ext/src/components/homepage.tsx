import React, { useState } from "react";
import '../css/homepage.css';
import { runConvert } from "./html_to_txt";
// for linking the UI states
import { Link } from "react-router-dom";

function Homepage() {
  // state for max and min video durations in minutes
  const [maxVideoDuration, setMaxVideoDuration] = useState(0);
  const [minVideoDuration, setMinVideoDuration] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState(""); 
  const [thumbnail, setThumbnail] = useState(""); // State to store thumbnail URL

  // function to convert minutes to seconds
  const convertToSeconds = (minutes: number) => {
    return minutes * 60;
  };

  // submit button
  const handleSubmit = async () => {
    if (maxVideoDuration <= 0)  {
      alert("Please enter at least a maximum video duration.");
      return;
    } else if (minVideoDuration > maxVideoDuration){
      alert("Please enter a minimum video duration that is less than the maximum video duration");
      return;
    }

    // to store url
    let currentTabUrl = null;
    
    // getting current window url
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]?.url) {
      const currentTabUrl = tabs[0].url;
      // call jaxons script
      const minLength = convertToSeconds(minVideoDuration);
      const maxLength = convertToSeconds(maxVideoDuration);
      runConvert(currentTabUrl, minLength, maxLength).then(result => {
        // Check if the result is not null or undefined and has both properties
        if (result && 'finalVideoUrl' in result && 'finalThumbnailUrl' in result) {
          // Update the state with the received YouTube URL and thumbnail URL
          setYoutubeUrl(result.finalVideoUrl);
          setThumbnail(result.finalThumbnailUrl);
        } else {
          console.error('No video to show');
        }
      });
    }
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
      {thumbnail && (
        <div className="thumbnail-container">
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <img src={thumbnail} alt="Thumbnail" className="thumbnail-image" />
          </a>
        </div>
      )}
    </div>
  );
}

export default Homepage;
