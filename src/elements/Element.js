import React, { Component } from "react";
import PropTypes from "prop-types";
import * as PIXI from "pixi.js";
import CircleTable from "./CircleTable"

//const interactionManager = new PIXI.interaction.InteractionManager()

// http://pixijs.io/examples/#/basics/basic.js
export default class Element extends Component {

  constructor(props){
    super(props)
    this.state = {
      x: props.x,
      y: props.y,
      grabbed: false
    };
    
    this.handlePress = this.handlePress.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.determineElement = this.determineElement.bind(this)
  }

  handlePress(event){
    //console.log(event.data)
    this.props.onSelect()
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
      if(this.props.elementType === "table-round"){
          return <CircleTable {...props}/>
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
        radius: 30
    } 
    return this.determineElement(elementProps)
  }
}
