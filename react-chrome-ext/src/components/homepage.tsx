/*global chrome*/
import React, { useState } from "react"; 
import '../css/homepage.css'; 

function homepage() {
  // radio buttons for the amount of videos
  const [selectedOption, setSelectedOption] = useState('');
  
  // to store the URL
  const [linkUrl, setLinkUrl] = useState('');

  // the state of the checkbox for inputting time
  const [wantToInputTime, setWantToInputTime] = useState(false);

  // when the radio button selected changes
  const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);

  };

  // when the box is checked
  const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
    setWantToInputTime(event.target.checked);
  };

  // submit button
  const handleSubmit = async () => {
    // code to get current tab url
    
  };

  // JSX for displaying in the popup
  return (
    <div className="App">s
      <div className="container">
        <h2>Select how many videos you want</h2>
        <div className="radio-container">
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
        <div className="radio-container">
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
        <div className="selected-option">
          {selectedOption && <p>Selected Option: {selectedOption}</p>}
        </div>
      </div>
      <div className="container">
        <h2>Do you want to input a time?</h2>
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
          <div className="time-container">
            <input type="time" />
          </div>
        )}
      </div>
      <div className="container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}


export default homepage;