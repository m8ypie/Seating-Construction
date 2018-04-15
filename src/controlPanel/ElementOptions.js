
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

    render(){
        const {name, elementType, optionChange, eleKey, eleOptions} = this.props
        const {seatNumber} = this.state.options
        return (
            <div style={{paddingTop:30}}>
                <h4 style={{color:"#FFFF", textAlign:"center"}}>Round Table</h4>
                <div style={{color:"#FFFF", paddingLeft:3}}>
                    Number of Seats
                    <InputNumber key="seatNumber" size="small" value={seatNumber || 0} style={{width:100}} onChange={this.optionsChange("seatNumber")}/>
                </div>
            </div>
        )
    }

}