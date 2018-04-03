import React, { Component } from "react";
import PropTypes from "prop-types";
import Bunny from "./Bunny";
import * as PIXI from "pixi.js";

//const interactionManager = new PIXI.interaction.InteractionManager()

// http://pixijs.io/examples/#/basics/basic.js
class RotatingBunny extends Component {

  constructor(props){
    super(props)
    this.state = {
      rotation: 0,
      x: props.x,
      y: props.y,
      grabbed: false,
      data: undefined
    };
    this.handlePress = this.handlePress.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  componentDidMount() {
    this.context.app.ticker.add(this.animate);
  }

  componentWillUnmount() {
    this.context.app.ticker.remove(this.animate);
  }

  animate = delta => {
    this.setState(state => ({
      ...state,
      rotation: state.rotation + 0.1 * delta
    }));
  };

  handlePress(event){
    //console.log(event.data)
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

  render() {
    return <Bunny 
      {...this.props} 
      x={this.state.x}
      y={this.state.y}
      rotation={this.state.rotation} 
      interactive={true}
      mousedown={this.handlePress}
      touchstart={this.handlePress}
      mouseup={this.handleRelease}
      mouseupoutside={this.handleRelease}
      touchend={this.handleRelease}
      touchendoutside={this.handleRelease}
      mousemove={this.handleMove}
      touchmove={this.handleMove}
    />;
  }
}
RotatingBunny.contextTypes = {
  app: PropTypes.object
};

export default RotatingBunny;
