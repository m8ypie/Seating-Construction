import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import Panel from "./controlPanel/Panel"
import { Slider } from 'antd';
import Element from "./elements/Element"
class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
        elements: []
    }
    this.handleElementSelection = this.handleElementSelection.bind(this)
  }

  handleChange(value){
    this.setState({scale:{x:value, y:value}})
  }

  handleElementSelection(key) {
    const {width, height} = this.props
    console.log(`width: ${width}, height:${height} width/2: ${width/2} height/2: ${height/2}`)
    const newElements = this.state.elements.concat([<Element elementType={key} x={width/2} y={height/2}/>])
    this.setState({elements:newElements})
  }

  render() {
    const {width, height, options} = this.props
    return <div style={{height:"100%"}}>
        {/*<div style={{display:"inline", width:width, height:height, paddingRight:200}}>*/}
        <div style={{display: "inline-block", height: height, width:258, verticalAlign:"top"}}>
            <Panel width={width} height={"100%"} onElementSelection={this.handleElementSelection}/>
        </div>
        {/*<div style={{display:"inline", width:200, height:"100%", paddingLeft:200}}/>*/}
        <div style={{display: "inline-block"}}>
            <Stage
            options={options}
            height={height} 
            width={width}
            >
                {this.state.elements}
            </Stage>
        </div>
      </div>
  }
}

export default Map;
