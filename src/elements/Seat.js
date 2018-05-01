import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import { connect } from 'react-redux'
import * as PIXI from "pixi.js";
 
export default class Seat extends Component {

    constructor(props){
      super(props)
      this.handlePress = this.handlePress.bind(this)
    }

    handlePress(event){
      console.log("here", event)
    }

    drawSeatsSquare(lineColor, seatsLong, seatsWide){
      const {tableId} = this.props 
      const graphics = this.refs.graphics;
      const {seats, options} = this.props.table
      graphics.clear()

      const seatRadius = this.props.seatRadius
      const seatTop = Math.ceil(seatsLong/2)
      const seatBottom = Math.floor(seatsLong/2)
      const seatLeft = Math.ceil(seatsWide/2)
      const seatRight = Math.floor(seatsWide/2)

      const offset = seatRadius*2
      const distanceFromTable = (seatRadius+5)
      const width = seatTop*(2*1.5*seatRadius)+seatRadius
      const height = seatLeft*(2*1.5*seatRadius)+seatRadius

      for(var i = 0; i < seatTop; i++){
        const x =  - width/2 + offset +(offset*1.5*i)
        const y = -height/2 - distanceFromTable
        this.drawSeat(x,y, seatRadius, lineColor);
      }
      for(var i = 0; i < seatBottom; i++){
        const x =  - width/2 + offset +(offset*1.5*i)
        const y = height/2 + distanceFromTable
        this.drawSeat(x,y, seatRadius, lineColor);
      }

      for(var i = 0; i < seatLeft; i++){
        const x =  -width/2 - distanceFromTable 
        const y = -height/2 + offset +(offset*1.5*i)
        this.drawSeat(x, y, seatRadius, lineColor);
      }

      for(var i = 0; i < seatRight; i++){
        const x =  width/2 + distanceFromTable
        const y = -height/2 + offset +(offset*1.5*i)
        this.drawSeat(x, y, seatRadius, lineColor);
      }
      return {width:width, height:height}
  }

    drawSeatsCircle(lineColor, seats){
      const graphics = this.refs.graphics;
      graphics.clear()
      const seatCircleRadius = seats > 8 ? this.props.seatRadius/2 * seats : this.props.seatRadius * 2 * 2
      for(var i = 0; i < seats; i++){
        const x = seatCircleRadius * Math.cos(i * (2 * Math.PI) / seats)
        const y = seatCircleRadius * Math.sin(i * (2 * Math.PI) / seats)
        this.drawSeat(x, y, this.props.seatRadius, lineColor)
      }
      return seatCircleRadius - this.props.seatRadius*2
    }

    drawSeat(x, y, rad, lineColor) {
      const graphics = this.refs.graphics;
      graphics.beginFill(0xFFFFFF);
      graphics.lineStyle(2, lineColor, 1)
      graphics.drawCircle(x, y, rad);
      graphics.endFill();
    }

    render(){
      const {x, y} = this.props
      return <Graphics ref='graphics'
        interactive={true}
        mousedown={this.handlePress}
        touchstart={this.handlePress}
        x={x}
        y={y}
      />
    }
}