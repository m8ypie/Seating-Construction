import React, { Component } from "react";
import ReactDOM from "react-dom";
import { TableMap, actions } from "seating-construction"
import { save, load } from "./service"
import { connect } from 'react-redux'
import { Button } from 'antd';
import '../node_modules/antd/dist/antd.css'

const {
  updateSeat,
  loadSeatingMap
} = actions

const height = "70%";
const width = "70%";
const options = {
  backgroundColor: 0xdfdfdf,
};


class Construct extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading:false,
      seatData:{},
      tableId:false,
      seatId:false
    }
    this.save = this.save.bind(this)
  }

  async componentWillMount(){
    const { loadSeatingMap } = this.props
    const seatingMap = await load()
    console.log("seatingMap",seatingMap)
    loadSeatingMap(seatingMap)
  }

  save(){
    const {tables, tableIds} = this.props.tableMap
    save({
      tables: tables,
      tableIds: tableIds
    })
  }

  render() {
    //const {width, height, options} = this.props
    const {loading} = this.state
    return (
      <div style={{ height:"100%"}}>
        {/*<h1>My Seating Map</h1>*/}
        <TableMap constructionMode={true} width={width} height={height} options={options}/>
        <Button type="primary" loading={this.state.loading} onClick={this.save}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({ 
    tableMap: state.tableMap
}),
{  updateSeat,
  loadSeatingMap}
)(Construct);