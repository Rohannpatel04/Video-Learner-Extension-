/*global chrome*/
import React, { useState } from "react"; 
import './App.css';

function App() {
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

  // what is displayed in the popup
  return (
    <div className="App">
      <h2>Select how many videos you want</h2>
      <div>
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
      <div>
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
      <div>
        {selectedOption && <p>Selected Option: {selectedOption}</p>}
      </div>
      <h2>Do you want to input a time?</h2>
        <label className="checkbox"> Yes
          <input 
            type="checkbox" 
            checked= {wantToInputTime}
            onChange = {handleCheckboxChange}
            />
          <span className="checkmark"></span>
        </label>
        {wantToInputTime && (
          <div>
            {/* put in a slider here*/}
            <input type="time"/>
          </div>
        )}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
    
} 

export default App;