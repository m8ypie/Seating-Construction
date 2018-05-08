import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage, Container } from "react-pixi-fiber";
import { connect } from 'react-redux'
import { addTable, removeTable, updateTable, resizeCanvas, setConstructionMode } from './state/seatingActions'
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
        this.determineCanvasWidthHeight = this.determineCanvasWidthHeight.bind(this)
        this.elementCount = 0
        const { constructionMode, setConstructionMode } = props
        setConstructionMode(constructionMode)
        const { canvasHeight, canvasWidth } = this.determineCanvasWidthHeight(props.width, props.height, constructionMode)
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

    componentWillReceiveProps(props){
        const {width, height, constructionMode} = props
        const { canvasHeight, canvasWidth } = this.determineCanvasWidthHeight(width, height, constructionMode)
        this.setState({
            canvasHeight: canvasHeight,
            canvasWidth: canvasWidth
        })
    }

    determineCanvasWidthHeight(width, height, constructionMode){
        const dimensions = {}
        if(typeof width === "number"){
            dimensions.canvasWidth = width
        }else{
            if(width.endsWith("px")){
                dimensions.canvasWidth = parseInt(width.replace("px", ""))
            }else if(width.endsWith("%")){
                const percentage = parseInt(width.replace("%", ""))/100
                dimensions.canvasWidth = (window.innerWidth * percentage)
            }
        }
        if(constructionMode){
            dimensions.canvasWidth = dimensions.canvasWidth - 417
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
    const {width, height, options, tableMap, onSeatClicked, constructionMode} = this.props
    const {canvasHeight, canvasWidth} = this.state
    if(constructionMode){
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
    }else{
        return <div style={{display: "inline-block"}}>
            <Stage
                options={options}
                height={canvasHeight} 
                width={canvasWidth}
            >   
                {tableMap.tableIds.map((id) => <SeatingElement onSeatClicked={onSeatClicked} key={id} id={id}/>)}
            </Stage>
        </div>
    }
  }
}

export default connect((state, ownProps) => ({ 
    tableMap: state.tableMap
  }),
  { updateTable, addTable, removeTable, resizeCanvas, setConstructionMode }
)(TableMap);
