import React, { Component } from "react";
import "./App.css";
import DogBuddy from "./components/DogBuddy";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <DogBuddy />
        </header>
      </div>
    );
  }
}

export default App;
