import React, { Component } from "react";
import ElementSelection from "./ElementSelection"
export default class Panel extends Component {

//<ElementSelection/>

    render(){
        const {width, height, onElementSelection} = this.props
        return <ElementSelection height={height} onElementSelection={onElementSelection}/>
        // <div style={{backgroundColor:"black", width:200, height:height}}/>
    }
}