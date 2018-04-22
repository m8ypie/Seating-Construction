import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import { connect } from 'react-redux'
import { addTable, removeTable, updateTable, resizeCanvas } from './state/seatingActions'
import Panel from "./controlPanel/Panel"
import { Slider, Input, T } from 'antd';
import SeatingElement from "./elements/Element"
import ElementOptions from "./controlPanel/ElementOptions"

class TableMap extends Component {

  constructor(props){
    super(props)
    this.state = {
        elements: [],
        elementClicked: false,
        selectedEleKey: -1,
        eleOptions:{},
        selectedType:"",
        elementType:""
    }
    this.handleElementSelection = this.handleElementSelection.bind(this)
    this.handleComponentSelect = this.handleComponentSelect.bind(this)
    this.handleEleOptions = this.handleEleOptions.bind(this)
    this.elementCount = 0
  }

  handleEleOptions(eleKey, options){
    const elements = this.state.elements
    const element = elements[eleKey]
    elements[eleKey] = <SeatingElement key={eleKey} {...element.props} options={options}/>
    this.setState({elements: elements})
  }

  handleComponentSelect(key, options, label, elementType){
    this.setState({elementClicked:true, selectedEleKey:key, eleOptions:options, selectedType:label, elementType:elementType})
  }

  handleElementSelection(key, label) {
    const {width, height, tableMap, addTable} = this.props
    const newTableId = tableMap.tableIds.length
    const newTableValue = {
      x: width/2,
      y: height/2,
      elementType:key,
      label:label,
      id: newTableId,
      options:{}
    }
    addTable(newTableId,newTableValue)
  }

  componentDidMount(){
      window.addEventListener("resize", this.props.resizeCanvas);
  }
  componentWillUnmount(){
      window.removeEventListener("resize", this.props.resizeCanvas);
  }

  render() {
    const {width, height, options, tableMap} = this.props
    return <div style={{height:"100%"}}>
        <div style={{float:"left", height: height, width:200, verticalAlign:"top"}}>
            <Panel width={width} height={"100%"} onElementSelection={this.handleElementSelection}/>
        </div>
        <div style={{display: "inline-block"}}>
            <Stage
            options={options}
            height={tableMap.windowHeight} 
            width={tableMap.windowWidth}
            >
                {tableMap.tableIds.map((id) => <SeatingElement key={id} id={id}/>)}
            </Stage>
        </div>
        <div style={{float:"right", height: "100%", width:200, minHeight:940, verticalAlign:"top", backgroundColor:"#001529"}}>
            <ElementOptions/>

        </div>
      </div>
  }
}

export default connect((state, ownProps) => ({ 
    tableMap: state.tableMap
  }),
  { updateTable, addTable, removeTable, resizeCanvas }
)(TableMap);
