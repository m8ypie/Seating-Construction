import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
 
export default class CircleTable extends Component {

  componentDidMount() {
    const graphics = this.refs.graphics;
    graphics.beginFill(0x3498db);
    console.log("asdfs", this.props.x)
    graphics.drawCircle(0, 0, this.props.radius);
    graphics.endFill();
  }

    render(){
        return <Graphics ref='graphics' {...this.props}/>
    }
}