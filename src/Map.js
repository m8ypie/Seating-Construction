import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import Panel from "./controlPanel/Panel"
import { Slider, Input, T } from 'antd';
import Element from "./elements/Element"
import ElementOptions from "./controlPanel/ElementOptions"
class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
        elements: [],
        elementClicked: false,
        selectedEleKey: -1,
        eleOptions:{}
    }
    this.handleElementSelection = this.handleElementSelection.bind(this)
    this.handleComponentSelect = this.handleComponentSelect.bind(this)
    this.handleEleOptions = this.handleEleOptions.bind(this)
    this.elementCount = 0
  }

  handleEleOptions(eleKey, options){
    const elements = this.state.elements
    const element = elements[eleKey]
    elements[eleKey] = <Element key={eleKey} {...element.props} options={options}/>
    this.setState({elements: elements})
  }

  handleComponentSelect(key, options){
    this.setState({elementClicked:true, selectedEleKey:key, eleOptions:options})
  }

  handleElementSelection(key) {
    const {width, height} = this.props
    const newElements = this.state.elements.concat([<Element key={this.elementCount} options={{}} eleKey={this.elementCount} elementType={key} x={width/2} y={height/2} onSelect={this.handleComponentSelect}/>])
    this.elementCount++
    this.setState({elements:newElements})
  }

  render() {
    const {width, height, options} = this.props
    return <div style={{height:"100%"}}>
        <div style={{float:"left", height: height, width:200, verticalAlign:"top"}}>
            <Panel width={width} height={"100%"} onElementSelection={this.handleElementSelection}/>
        </div>
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
            <ElementOptions optionChange={this.handleEleOptions} eleKey={this.state.selectedEleKey} eleOptions={this.state.eleOptions}/>
            : null
          }

        </div>
      </div>
  }
}

//#001529
export default Map;
