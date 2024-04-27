import React, { useState } from "react"; 

function App() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

  // what is put into the popup
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
        Selected Option: {selectedOption}
      </div>
    </div>
  );
    
} 

export default App;