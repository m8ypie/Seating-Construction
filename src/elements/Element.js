import React, { Component } from "react";
import PropTypes from "prop-types";
import * as PIXI from "pixi.js";
import CircleTable from "./CircleTable"
import SquareTable from "./SquareTable"
//const interactionManager = new PIXI.interaction.InteractionManager()

// http://pixijs.io/examples/#/basics/basic.js
const seatRadius = 7.5

export default class Element extends Component {

  constructor(props){
    super(props)
    this.state = {
      elementKey: props.eleKey,
      x: props.x,
      y: props.y,
      grabbed: false,
      options:props.options,
      elementType: props.elementType
    };
    this.handlePress = this.handlePress.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.determineElement = this.determineElement.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({options:nextProps.options})
  }

  handlePress(event){
    this.props.onSelect(this.state.elementKey, this.state.options, this.props.label, this.state.elementType)
    this.setState({ grabbed:true })
  }

  handleRelease(){
    this.setState({ grabbed:false })
  }

  handleMove(event){
    if(this.state.grabbed){
      const {x, y} = event.data.global
      this.setState({x:x, y:y})
    }
  }

  determineElement(props){
    switch(this.props.elementType){
      case "table-round":
        return <CircleTable {...props}/>
      case "table-square":
        return <SquareTable {...props}/>
      default:
        return null
    }
  }

  render() {
    const elementProps = { 
        x:this.state.x,
        y:this.state.y,
        rotation:this.state.rotation, 
        interactive:true,
        mousedown:this.handlePress,
        touchstart:this.handlePress,
        mouseup:this.handleRelease,
        mouseupoutside:this.handleRelease,
        touchend:this.handleRelease,
        touchendoutside:this.handleRelease,
        mousemove:this.handleMove,
        touchmove:this.handleMove,
        grabbed:this.state.grabbed,
        radius: 30,
        width: 60,
        height: 60,
        seatRadius:seatRadius,
        ...(this.state.options)
    } 
    return this.determineElement(elementProps)
  }
}
