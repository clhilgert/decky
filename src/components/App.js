import React, { Component, useEffect } from "react";
import MainContainer from './MainContainer'
const originalError = console.error;

console.error = function (...args) {
  // Check if the error message contains the specific warning about ReactDOM.render
  if (args.some(arg => typeof arg === 'string' && arg.includes('Warning: ReactDOM.render is no longer supported'))) {
    // Ignore the error by not calling the original console.error
    return;
  }
  // If it's not the specific warning, log the error as usual
  originalError.apply(console, args);
};
class App extends Component {

  render() {
    return (
      <div>
        <MainContainer />
      </div>
    )
  }
}

export default App;