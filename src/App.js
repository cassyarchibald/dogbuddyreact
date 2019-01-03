import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./components/Person";
import Dog from "./components/Dog.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Person />
          <Dog />
        </header>
      </div>
    );
  }
}

export default App;
