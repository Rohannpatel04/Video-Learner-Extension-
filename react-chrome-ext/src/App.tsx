import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage";
import Ytpage from "./components/ytpage";

function App() {
  const [url, setUrl] = useState(""); // Define url state and its setter function

  return (
    <Router>
      <div className="App">
        <HomePage/>
      </div>
    </Router>
  );
}

export default App;
