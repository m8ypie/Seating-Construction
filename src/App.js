import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import RotatingBunny from "./RotatingBunny";
import '../node_modules/antd/dist/antd.css'
import { Slider } from 'antd';

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x1099bb,
};


class App extends Component {

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      scale:{
        x:1,
        y:1
      }
    }
  }

  handleChange(value){
    this.setState({scale:{x:value, y:value}})
  }

  render() {
    const {scale} = this.state
    return (
      <div>
        <Stage
          options={OPTIONS}
          height={height} 
          width={width} 
        >
          <RotatingBunny 
            x={width / 2} 
            y={height / 2}
            scale={scale}
          />
        </Stage>
        <div style={{paddingLeft:10,paddingTop:10}}>
          <Slider style={{width:100}} defaultValue={1} disabled={false} max={5} min={1} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default App;
