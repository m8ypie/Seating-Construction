
import React, { Component } from "react";
import { InputNumber } from 'antd';

//const numberInput = Input.Number

export default class ElementOptions extends Component {

    constructor(props){
        super(props)
        this.state = {options:props.eleOptions}
        this.optionsChange = this.optionsChange.bind(this)
    }

    optionsChange(key){
        const field = key
        return (value) => {
            const options = this.state.options
            options[key] = value
            this.setState({options:options})
            this.props.optionChange(this.props.eleKey, options)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({options: nextProps.eleOptions})
    }

    getOptions(){
         const {eleKey, eleOptions, name, elementType} = this.props
         if(elementType === "table-round"){
             const {seatNumber} = this.state.options
            return <div>
                    <h4 style={{color:"#FFFF", textAlign:"center"}}>{name}</h4>
                    <div style={{color:"#FFFF", paddingLeft:3}}>
                        Number of Seats
                        <InputNumber key="seatNumber" size="small" value={seatNumber || 0} style={{width:100}} onChange={this.optionsChange("seatNumber")}/>
                    </div>
                </div>
         }else if(elementType === "table-square"){
             const {seatLong, seatWide} = this.state.options
            return <div>
                <h4 style={{color:"#FFFF", textAlign:"center"}}>{name}</h4>
                <div style={{color:"#FFFF", paddingLeft:5}}>
                    Seats Top and Bottom
                    <InputNumber key="seatWide" size="small" value={seatWide || 0} style={{width:100}} onChange={this.optionsChange("seatWide")}/>
                </div>
                <div style={{color:"#FFFF", paddingLeft:5, paddingTop:10}}>
                    Seats Top and Bottom
                    <InputNumber key="seatLong" size="small" value={seatLong || 0} style={{width:100}} onChange={this.optionsChange("seatLong")}/>
                </div>
                
            </div>
         }
    }

    render(){
        const {name, elementType, optionChange, eleKey, eleOptions} = this.props
        const {seatNumber} = this.state.options
        return (
            <div style={{paddingTop:30}}>
                {this.getOptions()}
            </div>
        )
    }

}