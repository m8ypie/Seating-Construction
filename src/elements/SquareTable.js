import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
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
        const seatRadius = newProps ? newProps.seatRadius : this.props.seatRadius
        const seatsLong = newProps ? newProps.seatLong || 0 : this.props.seatLong || 0
        const seatsWide = newProps ? newProps.seatWide || 0 : this.props.seatWide || 0
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

    componentWillReceiveProps(nextProps){
        const graphics = this.refs.graphics;
        const lineColor = nextProps.grabbed ? 0x07ba89 : 0x000000
        graphics.clear()
        const {width, height} = this.drawSeats(lineColor, nextProps)
        this.drawTable(width, height, lineColor)
    }

    render(){
        return <Graphics ref='graphics' {...this.props}/>
    }
}