import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage, Container } from "react-pixi-fiber";
import { connect } from 'react-redux'
import { addTable, removeTable, updateTable, resizeCanvas } from './state/seatingActions'
import Panel from "./controlPanel/Panel"
import DraggableContainer from "./DraggableContainer";
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
        const { canvasHeight, canvasWidth } = this.determineCanvasWidthHeight(props.width, props.height)
        this.state = {
            canvasHeight: canvasHeight,
            canvasWidth: canvasWidth
        }
    }

    handleEleOptions(eleKey, options){
        const {onSeatClicked} = this.props
        const elements = this.state.elements
        const element = elements[eleKey]
        elements[eleKey] = <SeatingElement onSeatClicked={onSeatClicked} key={eleKey} {...element.props} options={options}/>
        this.setState({elements: elements})
    }

    handleComponentSelect(key, options, label, elementType){
        this.setState({elementClicked:true, selectedEleKey:key, eleOptions:options, selectedType:label, elementType:elementType})
    }

    handleElementSelection(key, label) {
        const {canvasHeight, canvasWidth} = this.state
        const {tableMap, addTable} = this.props
        const newTableId = tableMap.tableIds.length
        const newTableValue = {
        x: canvasWidth/2,
        y: canvasHeight/2,
        elementType:key,
        label:label,
        id: newTableId,
        options:{},
        seats:[]
        }
        addTable(newTableId,newTableValue)
    }

    componentDidMount(){
        window.addEventListener("resize", this.props.resizeCanvas);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.props.resizeCanvas);
    }

    determineCanvasWidthHeight(width, height){
        const dimensions = {}
        if(typeof width === "number"){
            dimensions.canvasWidth = width - 400
        }else{
            if(width.endsWith("px")){
                dimensions.canvasWidth = parseInt(width.replace("px", "")) - 417
            }else if(width.endsWith("%")){
                const percentage = parseInt(width.replace("%", ""))/100
                dimensions.canvasWidth = (window.innerWidth * percentage) - 417
            }
        }

        if(typeof height === "number"){
            dimensions.canvasHeight = height
        }else{
            if(height.endsWith("px")){
                dimensions.canvasHeight = parseInt(height.replace("px", ""))
            }else if(height.endsWith("%")){
                const percentage = parseInt(height.replace("%", ""))/100
                dimensions.canvasHeight = (window.innerHeight * percentage)
            }
        }
        return dimensions
    }

  render() {
    const {width, height, options, tableMap, onSeatClicked} = this.props
    const {canvasHeight, canvasWidth} = this.state
    return <div style={{height:height, width:width, background:"#001529"}}>
        <div style={{float:"left", height: height, verticalAlign:"top"}}>
            <Panel height={height} onElementSelection={this.handleElementSelection}/>
        </div>
        <div style={{display: "inline-block"}}>
                <Stage
                    options={options}
                    height={canvasHeight} 
                    width={canvasWidth}
                >   
                    {tableMap.tableIds.map((id) => <SeatingElement onSeatClicked={onSeatClicked} key={id} id={id}/>)}
                </Stage>

        </div>
        <div style={{float:"right", height: height, width:200, verticalAlign:"top", backgroundColor:"#001529"}}>
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
