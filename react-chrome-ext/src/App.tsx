import React, { useState } from "react"; 

function App() {
  // radio buttons for the amount of videos
  const [selectedOption, setSelectedOption] = useState('');
  
  // to store the URL
  const [linkUrl, setLinkUrl] = useState('');

  // when the radio button selected changes
  const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);

  };

  // submit button
  const handleSubmit = async () => {
    // code to get current tab url
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    setLinkUrl(tab.url);  
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
      <div style={{ display: 'none' }}>
        {/* Hidden link */}
        <a id="hidden-link" href={linkUrl} target="_blank" rel="noopener noreferrer"></a>
      </div>   
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
    
} 

export default App;