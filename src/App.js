import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import RotatingBunny from "./RotatingBunny";

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x1099bb,
};


class App extends Component {
  render() {
    return (
      <Stage
        options={OPTIONS}
        height={height} 
        width={width} 
      >
        <RotatingBunny 
          x={width / 2} 
          y={height / 2} 
        />
      </Stage>
    );
  }
}

export default App;
