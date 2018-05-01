
import React, { Component } from "react";
import { InputNumber } from 'antd';
import { connect } from 'react-redux'
import { updateTable, removeTable } from '../state/seatingActions'
//const numberInput = Input.Number

class ElementOptions extends Component {

    constructor(props){
        super(props)
        this.optionsChange = this.optionsChange.bind(this)
    }

    calculateNewSeatState(field, value, table){
        let seatAmount
        if(table.elementType === "table-square"){
            if(field === "seatWide"){
                seatAmount = (table.options.seatLong || 0) + value
            }else if(field === "seatLong"){
                seatAmount = (table.options.seatWide || 0) + value
            }
        }else if(table.elementType === "table-round"){
            seatAmount = value
        }
        const seats = []
        for(var i = 0; i < seatAmount; i++){
            if(table.seats[i]){
                seats.push({
                    ...table.seats[i]
                })
            }else{
                seats.push({
                    id: i,
                    reserved: false,
                    label:""
                })
            }
        }
        return seats
    }

    optionsChange(key){
        const field = key
        return (value) => {
            const { updateTable, tableMap } = this.props
            const { selectedTable, tables } = tableMap
            const table = tables[selectedTable]
            const newSeatState = this.calculateNewSeatState(field, value, table)
            const options = {
                ...table.options,
                [key]: value
            }
            const newTable = {
                ...table,
                options:options,
                seats:newSeatState
            }
            this.props.updateTable(selectedTable, newTable)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({options: nextProps.eleOptions})
    }

    getOptions(){
        const { selectedTable, tables } = this.props.tableMap
        
        if(selectedTable === false){
            return null
        }
        const table = tables[selectedTable]
        const {name, elementType} = table
        if(elementType === "table-round"){
            const {seatNumber} = table.options
        return <div>
                <h4 style={{color:"#FFFF", textAlign:"center"}}>{name}</h4>
                <div style={{color:"#FFFF", paddingLeft:3}}>
                    Number of Seats
                    <InputNumber key="seatNumber" size="small" value={seatNumber || 0} style={{width:100}} onChange={this.optionsChange("seatNumber")}/>
                </div>
            </div>
        }else if(elementType === "table-square"){
            const {seatLong, seatWide} = table.options
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
        return (
            <div style={{paddingTop:30}}>
                {this.getOptions()}
            </div>
        )
    }
}

export default connect((state, ownProps) => ({ 
    tableMap: state.tableMap
  }),
  { updateTable, removeTable }
)(ElementOptions);