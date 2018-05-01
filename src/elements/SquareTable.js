import React, { Component } from "react";
import { Graphics, Container } from "react-pixi-fiber";
import Seat from "./Seat.js";
import * as PIXI from "pixi.js";
 
export default class SquareTable extends Component {

    componentDidMount() {
        const lineColor = this.props.grabbed ? 0x07ba89 : 0x000000
        const {width, height} = this.drawSeats(lineColor)
        this.drawTable(width, height, lineColor)
    }

    drawTable(width, height, lineColor) {
        const graphics = this.refs.graphics;
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(2, lineColor, 1)
        graphics.drawRect(-width/2, -height/2, width, height);
        graphics.endFill();
    }

    drawSeat(x, y, rad, lineColor){
        const graphics = this.refs.graphics;
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(2, lineColor, 1)
        graphics.drawCircle(x, y, rad);
        graphics.endFill();
    }

    drawSeats(lineColor, newProps){
        const seatsLong = newProps ? newProps.seatLong || 0 : this.props.seatLong || 0
        const seatsWide = newProps ? newProps.seatWide || 0 : this.props.seatWide || 0

        return this.refs.seat.drawSeatsSquare(lineColor, seatsLong, seatsWide)
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
        return <Container>
            <Seat x={x} y={y} seatRadius={seatRadius} tableId={id} table={table} ref='seat'/> 
            <Graphics ref='graphics' {...this.props}/>
        </Container>
    }
}