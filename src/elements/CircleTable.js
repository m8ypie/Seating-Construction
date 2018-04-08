import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
 
export default class CircleTable extends Component {

  componentDidMount() {
    const graphics = this.refs.graphics;
    console.log(this.props)
    const lineColor = this.props.grabbed ? 0x07ba89 : 0x000000
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(0, 0, this.props.radius);
    graphics.endFill();
  }

  componentWillReceiveProps(nextProps){
    const graphics = this.refs.graphics;
    const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
    graphics.clear()
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(0, 0, this.props.radius);
    graphics.endFill();
  }

    render(){
        return <Graphics ref='graphics' {...this.props}/>
    }
}