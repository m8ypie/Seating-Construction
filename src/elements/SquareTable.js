import React, { Component } from "react";
import { Graphics, Container } from "react-pixi-fiber";
import Seat from "./Seat.js";
import * as PIXI from "pixi.js";
 
export default class SquareTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            seats:[]
        }
    }

    componentDidMount() {
        const lineColor = this.props.grabbed ? 0x07ba89 : 0x000000
        const {width, height} = this.drawSeats(lineColor)
        this.drawTable(width, height, lineColor)
        this.drawSeatsSquare = this.drawSeatsSquare.bind(this)
    }

    drawTable(width, height, lineColor) {
        const graphics = this.refs.graphics;
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(2, lineColor, 1)
        graphics.drawRect(-width/2, -height/2, width, height);
        graphics.endFill();
    }

    drawSeatsSquare(lineColor, seatsLong, seatsWide){
      const {id, x, y, table, tableId, seatClicked} = this.props 
      const graphics = this.refs.graphics;
      graphics.clear()
      const seatsArray = []
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
        const xPos =  - width/2 + offset +(offset*1.5*i)
        const yPos = -height/2 - distanceFromTable
        seatsArray.push(<Seat key={"top"+i} relX={x} relY={y} x={xPos} y={yPos} onClick={seatClicked} lineColor={lineColor} seatRadius={seatRadius} tableId={id} seatId={i}/>)
      }
      for(var i = 0; i < seatBottom; i++){
        const xPos =  - width/2 + offset +(offset*1.5*i)
        const yPos = height/2 + distanceFromTable
        seatsArray.push(<Seat key={"bottom"+i} relX={x} relY={y} x={xPos} y={yPos} onClick={seatClicked} lineColor={lineColor} seatRadius={seatRadius} tableId={id} seatId={seatsArray.length}/>)
      }

      for(var i = 0; i < seatLeft; i++){
        const xPos =  -width/2 - distanceFromTable 
        const yPos = -height/2 + offset +(offset*1.5*i)
        seatsArray.push(<Seat key={"left"+i} relX={x} relY={y} x={xPos} y={yPos} onClick={seatClicked} lineColor={lineColor} seatRadius={seatRadius} tableId={id} seatId={seatsArray.length}/>)
      }

      for(var i = 0; i < seatRight; i++){
        const xPos =  width/2 + distanceFromTable
        const yPos = -height/2 + offset +(offset*1.5*i)
        seatsArray.push(<Seat key={"right"+i} relX={x} relY={y} x={xPos} y={yPos} onClick={seatClicked} lineColor={lineColor} seatRadius={seatRadius} tableId={id} seatId={seatsArray.length}/>)
      }
      this.setState({ seats: seatsArray })
      return {width:width, height:height}
  }

    drawSeats(lineColor, newProps){
        const seatsLong = newProps ? newProps.seatLong || 0 : this.props.seatLong || 0
        const seatsWide = newProps ? newProps.seatWide || 0 : this.props.seatWide || 0
        return this.drawSeatsSquare(lineColor, seatsLong, seatsWide)
    }

    componentWillReceiveProps(nextProps){
        const graphics = this.refs.graphics;
        const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
        graphics.clear()
        const {width, height} = this.drawSeats(lineColor, nextProps)
        this.drawTable(width, height, lineColor)
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