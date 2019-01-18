import React, { Component } from "react";
import "./App.css";
import DogBuddy from "./components/DogBuddy";

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
