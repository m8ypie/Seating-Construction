import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import Panel from "./controlPanel/Panel"
import { Slider, Input, T } from 'antd';
import Element from "./elements/Element"
class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
        elements: [],
        elementClicked: false
    }
    this.handleElementSelection = this.handleElementSelection.bind(this)
  }

  handleElementSelection(key) {
    const {width, height} = this.props
    console.log(`width: ${width}, height:${height} width/2: ${width/2} height/2: ${height/2}`)
    const newElements = this.state.elements.concat([<Element elementType={key} x={width/2} y={height/2} onSelect={() => this.setState({elementClicked:true})}/>])
    this.setState({elements:newElements})
  }

  render() {
    const {width, height, options} = this.props
    return <div style={{height:"100%"}}>
        {/*<div style={{display:"inline", width:width, height:height, paddingRight:200}}>*/}
        <div style={{float:"left", height: height, width:200, verticalAlign:"top"}}>
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
        <div style={{float:"right", height: "100%", width:200, minHeight:940, verticalAlign:"top", backgroundColor:"#001529"}}>
          {this.state.elementClicked ? 
            <div style={{paddingTop:30}}>
              <h4 style={{color:"#FFFF", textAlign:"center"}}>Round Table</h4>
              <div style={{color:"#FFFF", paddingLeft:3}}>
                Number of Seats
                <Input size="small" placeholder="small size" style={{width:100}} />
              </div>
            </div>
            : null
          }

        </div>
      </div>
  }
}

//#001529
export default Map;
