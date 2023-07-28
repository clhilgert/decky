import React, { Component, useEffect } from "react";
import MainContainer from './MainContainer'
const originalError = console.error;

console.error = function (...args) {
  if (args.some(arg => typeof arg === 'string' && arg.includes('Warning: ReactDOM.render is no longer supported'))) {
    return;
  }
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