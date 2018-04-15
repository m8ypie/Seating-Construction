import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
 
export default class CircleTable extends Component {

  componentDidMount() {
    const lineColor = this.props.grabbed ? 0x07ba89 : 0x000000
    const radius = this.drawSeats(lineColor)
    this.drawTable(lineColor, radius)
  }

  drawTable(lineColor, radius) {
    const graphics = this.refs.graphics;
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();
  }

  drawSeats(lineColor, newProps){
    const graphics = this.refs.graphics;
    const seats = newProps ? newProps.seatNumber : this.props.seatNumber
    const seatCircleRadius = seats > 8 ? this.props.seatRadius/2 * seats : this.props.seatRadius * 2 * 2
    for(var i = 0; i < seats; i++){
      const x = seatCircleRadius * Math.cos(i * (2 * Math.PI) / seats)
      const y = seatCircleRadius * Math.sin(i * (2 * Math.PI) / seats)
      this.drawSeat(x, y, this.props.seatRadius, lineColor)
    }
    return seatCircleRadius - this.props.seatRadius*2
  }

     drawSeat(x, y, rad, lineColor){
        const graphics = this.refs.graphics;
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(2, lineColor, 1)
        graphics.drawCircle(x, y, rad);
        graphics.endFill();
    }

  componentWillReceiveProps(nextProps){
    const graphics = this.refs.graphics;
    const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
    graphics.clear()
    const radius = this.drawSeats(lineColor, nextProps)
    this.drawTable(lineColor, radius)
  }

    render(){
        return <Graphics ref='graphics' {...this.props}/>
    }
}