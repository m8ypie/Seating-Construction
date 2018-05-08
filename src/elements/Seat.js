import React, { Component } from "react";
import { Graphics } from "react-pixi-fiber";
import { connect } from 'react-redux'
import * as PIXI from "pixi.js";

class Seat extends Component {

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(event) {
    const {seatId, tableId, onClick, constructionMode, seat} = this.props
    if(!constructionMode){
      onClick(tableId, seatId, seat)
    }
  }

  componentDidMount() {
    const { x, y, lineColor, seatRadius } = this.props
    this.drawSeat(x, y, seatRadius, lineColor)
  }

  componentWillReceiveProps(nextProps) {
    const { x, y, lineColor, seatRadius } = nextProps
    this.drawSeat(x, y, seatRadius, lineColor)
  }

  drawSeat(x, y, rad, lineColor) {
    const graphics = this.refs.graphics;
    graphics.clear()
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, lineColor, 1)
    graphics.drawCircle(x, y, rad);
    graphics.endFill();
  }

  render() {
    const { relX, relY } = this.props
    return <Graphics ref='graphics'
      interactive={true}
      mousedown={this.handlePress}
      touchstart={this.handlePress}
      x={relX}
      y={relY}
    />
  }
}

export default connect((state, ownProps) => ({ 
  constructionMode: state.tableMap.constructionMode,
  seat: state.tableMap.tables[ownProps.tableId][ownProps.seatId]
}),
{}
)(Seat);