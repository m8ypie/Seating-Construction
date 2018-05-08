import React, { Component } from "react";
import PropTypes from "prop-types";
import * as PIXI from "pixi.js";
import CircleTable from "./CircleTable"
import SquareTable from "./SquareTable"
import { connect } from 'react-redux'
import { updateTable, selectTable, constructionMode } from '../state/seatingActions'
//const interactionManager = new PIXI.interaction.InteractionManager()

// http://pixijs.io/examples/#/basics/basic.js
const seatRadius = 7.5

class SeatingElement extends Component {

  constructor(props){
    super(props)
    const {table} = this.props
    this.handlePress = this.handlePress.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.determineElement = this.determineElement.bind(this)
    this.state = {
      x: table.x,
      y: table.y,
      grabbed: false
    }
  }

  handlePress(event){
    const{ constructionMode, table } = this.props
    if(constructionMode){
      table.grabbed = true
      this.props.updateTable(table.id, table)
      this.props.selectTable(table.id)
      this.setState({grabbed:true})
    }
  }

  handleRelease(){
    const{ constructionMode, table } = this.props
    if(constructionMode){
      table.grabbed = false
      table.x = this.state.x
      table.y = this.state.y
      this.props.updateTable(table.id, table)
      this.setState({grabbed:false})
    }
  }

  handleMove(event){
    const{ constructionMode, table } = this.props
    if(table.grabbed && constructionMode){
      const {x, y} = event.data.global
      this.setState({
        x:x,
        y:y
      })
    }
  }

  determineElement(props){
    const table = this.props.table
    switch(table.elementType){
      case "table-round":
        return <CircleTable {...props}/>
      case "table-square":
        return <SquareTable {...props}/>
      default:
        return null
    }
  }

  render() {
    const {table, id, onSeatClicked} = this.props
    const {x, y, grabbed} = this.state
    const elementProps = { 
        x: x,
        y: y,
        table:table,
        rotation: table.rotation, 
        interactive:true,
        mousedown:this.handlePress,
        touchstart:this.handlePress,
        mouseup:this.handleRelease,
        mouseupoutside:this.handleRelease,
        touchend:this.handleRelease,
        touchendoutside:this.handleRelease,
        mousemove:this.handleMove,
        touchmove:this.handleMove,
        grabbed: grabbed,
        radius: 30,
        width: 60,
        height: 60,
        seatRadius:seatRadius,
        seatClicked:onSeatClicked,
        ...(table.options),
        id: table.id
    } 
    return this.determineElement(elementProps)
  }
}

export default connect((state, ownProps) => ({ 
    table: state.tableMap.tables[ownProps.id],
    constructionMode: state.tableMap.constructionMode
  }),
  { updateTable, selectTable }
)(SeatingElement);