import React, { useState } from "react";
import '../css/homepage.css';
import { run } from './gpt.js';
import { runConvert } from "./html_to_txt";

function Homepage() {
  // radio buttons for the amount of videos
  // const [selectedOption, setSelectedOption] = useState('');

  // the state of the checkbox for inputting time
  const [wantToInputTime, setWantToInputTime] = useState(false);

  // state for max and min video durations in minutes
  const [maxVideoDuration, setMaxVideoDuration] = useState(0);
  const [minVideoDuration, setMinVideoDuration] = useState(0);

  // function to convert minutes to seconds
  const convertToSeconds = (minutes: number) => {
    return minutes * 60;
  };

  // when the radio button selected changes
  // const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedOption(event.target.value);
  // };

  // submit button
  const handleSubmit = async () => {
    if (wantToInputTime && (maxVideoDuration === 0 || minVideoDuration === 0)) {
      alert("Please enter both maximum and minimum video durations.");
      return;
    }

    // to store url
    let currentTabUrl = null;
    
    // getting current window url
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]?.url) {
      currentTabUrl = tabs[0].url;
      // display url in an alert for testing
      alert("Current tab URL: " + currentTabUrl);
      // call jaxons script
      runConvert(currentTabUrl);
      // Rohans script
      const filePath = 'page.txt'; 
      const minDuration = convertToSeconds(minVideoDuration); 
      const maxDuration = convertToSeconds(maxVideoDuration); 
      run(filePath, minDuration, maxDuration);
    }
  });
};



  // JSX for displaying in the popup
  return (
    <div className="popup-window">
      <div className="title-container">
        <h2 className="title">Video Learner</h2>
      </div>
      {/* <div className="radio-container">
        <h2 className="question-one">Select how many videos you want</h2>
        <div className="one-video-container">
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedOption === '1'}
              onChange={handleOptionChange}
            />
            One Video
          </label>
        </div>
        <div className="multiple-videos-container">
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedOption === '2'}
              onChange={handleOptionChange}
            />
            Multiple Videos
          </label>
        </div>
      </div> */}
      <div className="time-input-container">
        <h2 className="question-two">Do you want to give an ideal video length?</h2>
        <div className="checkbox-container">
          <label className="checkbox">
            Yes
            <input
              type="checkbox"
              checked={wantToInputTime}
              onChange={() => setWantToInputTime(!wantToInputTime)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {wantToInputTime && (
          <div className="time-dropdown-container">
            <label className="hours-label">
              Max Video Duration (mins):{" "}
              <input
                type="number"
                value={maxVideoDuration}
                onChange={(e) => setMaxVideoDuration(parseInt(e.target.value))}
                min="0"
                className="hours-input"
              />
            </label>
            <label className="minutes-label">
              Min Video Duration (mins):{" "}
              <input
                type="number"
                value={minVideoDuration}
                onChange={(e) => setMinVideoDuration(parseInt(e.target.value))}
                min="0"
                max="1440" // 24 hours in minutes
                className="minutes-input"
              />
            </label>
          </div>
        )}
      </div>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

}

export default Homepage;
