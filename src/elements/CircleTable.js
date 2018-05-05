import React, { Component } from "react";
import { Graphics, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Seat from "./Seat.js";
 
export default class CircleTable extends Component {

  constructor(props){
    super(props)
    this.state = {
      seats:[]
    }
    this.drawSeatsCircle = this.drawSeatsCircle.bind(this)
  }

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
    return this.drawSeatsCircle(lineColor, seats)
  }

  drawSeatsCircle(lineColor, seats){
    const graphics = this.refs.graphics;
    graphics.clear()
    const {x, y, seatRadius, id, table, seatClicked} = this.props
    const seatCircleRadius = seats > 8 ? this.props.seatRadius/2 * seats : this.props.seatRadius * 2 * 2
    const seatArray = []
    for(var i = 0; i < seats; i++){
      const posX = seatCircleRadius * Math.cos(i * (2 * Math.PI) / seats)
      const posY = seatCircleRadius * Math.sin(i * (2 * Math.PI) / seats)
      seatArray.push(<Seat key={i} relX={x} relY={y} x={posX} y={posY} onClick={seatClicked} seatRadius={seatRadius} lineColor={lineColor} tableId={id} seatId={i}/>)
    }
    this.setState({seats:seatArray})
    return seatCircleRadius - this.props.seatRadius*2
  }


  componentWillReceiveProps(nextProps){
    const graphics = this.refs.graphics;
    const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
    graphics.clear()
    const radius = this.drawSeats(lineColor, nextProps)
    console.log(radius)
    this.drawTable(lineColor, radius)
  }

    render(){
      const {x, y, seatRadius, id, table} = this.props
      const {seats} = this.state
        return <Container>
            {seats}
            <Graphics ref='graphics' {...this.props}/>
        </Container>
    }
}