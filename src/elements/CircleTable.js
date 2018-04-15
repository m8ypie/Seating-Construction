import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
 
export default class CircleTable extends Component {

  componentDidMount() {
    const graphics = this.refs.graphics;
    const lineColor = this.props.grabbed ? 0x07ba89 : 0x000000
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(0, 0, this.props.radius);
    graphics.endFill();
    this.drawSeats(lineColor)
  }

  drawSeats(lineColor, newProps){
    const graphics = this.refs.graphics;
    const seatRadius = newProps ? newProps.radius +15 : this.props.radius + 15
    const seats = newProps ? newProps.seatNumber : this.props.seatNumber

    for(var i = 0; i < seats; i++){
      const x = seatRadius * Math.cos(i * (2 * Math.PI) / seats)
      const y = seatRadius * Math.sin(i * (2 * Math.PI) / seats)
      graphics.beginFill(0xFFFFFF);
      graphics.lineStyle(2, lineColor, 1)
      graphics.drawCircle(x, y, 10);
      graphics.endFill();
    }
  }

  componentWillReceiveProps(nextProps){
    const graphics = this.refs.graphics;
    const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
    graphics.clear()
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(0, 0, this.props.radius);
    graphics.endFill();
    this.drawSeats(lineColor, nextProps)
  }

    render(){
        return <Graphics ref='graphics' {...this.props}/>
    }
}