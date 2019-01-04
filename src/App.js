import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./components/Person";
import DogBuddy from "./components/DogBuddy";
import Dog from "./components/Dog.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>HELLO WORLD</p>
          <DogBuddy />
        </header>
      </div>
    );
  }
}

export default App;
