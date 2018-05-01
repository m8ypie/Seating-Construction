import React, { Component } from "react";
import { Graphics, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Seat from "./Seat.js";
 
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
    const seats = newProps ? newProps.seatNumber : this.props.seatNumber
    return this.refs.seat.drawSeatsCircle(lineColor, seats)
  }


  componentWillReceiveProps(nextProps){
    const graphics = this.refs.graphics;
    const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
    graphics.clear()
    const radius = this.drawSeats(lineColor, nextProps)
    this.drawTable(lineColor, radius)
  }

    render(){
      const {x, y, seatRadius, id, table} = this.props
        return <Container>
            <Seat x={x} y={y} seatRadius={seatRadius} tableId={id} table={table} ref='seat'/>
            <Graphics ref='graphics' {...this.props}/>
        </Container>
    }
}