import React, { useState } from "react";
import '../css/homepage.css';

function Homepage() {
  // radio buttons for the amount of videos
  const [selectedOption, setSelectedOption] = useState('');

  // to store the URL
  const [linkUrl, setLinkUrl] = useState('');

  // the state of the checkbox for inputting time
  const [wantToInputTime, setWantToInputTime] = useState(false);

  // state for hours and minutes
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // when the radio button selected changes
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // when the box is checked
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWantToInputTime(event.target.checked);
  };

  // submit button
const handleSubmit = async () => {
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  if (wantToInputTime && (hours === 0 && minutes === 0)) {
    alert("Please enter a time.");
    return;
  }

  // Code to get current tab URL
};

  // JSX for displaying in the popup
  return (
    <div className="popup-window">
      <div className="title-container">
        <h2 className="title">Video Learner</h2>
      </div>
      <div className="radio-container">
        <h2>Select how many videos you want</h2>
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
      </div>
      <div className="time-input-container">
        <h2>Do you want to give an ideal video length?</h2>
        <div className="checkbox-container">
          <label className="checkbox">
            Yes
            <input
              type="checkbox"
              checked={wantToInputTime}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {wantToInputTime && (
          <div className="time-dropdown-container">
            <label className="hours-label">
              Hours:{" "}
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                min="0"
                className="hours-input"
              />
            </label>
            <label className="minutes-label">
              Minutes:{" "}
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                min="0"
                max="59"
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
