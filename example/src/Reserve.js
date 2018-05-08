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

const height = "100%";
const width = "100%";
const options = {
  backgroundColor: 0xdfdfdf,
};


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading:false,
      seatData:{},
      tableId:false,
      seatId:false
    }
    this.save = this.save.bind(this)
    this.onSeatClicked = this.onSeatClicked.bind(this)
  }
  async componentWillMount(){
    const seatingMap = await load()
    loadSeatingMap(seatingMap)
  }

  onSeatClicked(tableId, seatId, seatData){
    this.setState({
      tableId:tableId,
      seatId: seatId,
      seatData:seatData
    })
  }

  save(){
    save(this.props.tables)
  }

  render() {
    //const {width, height, options} = this.props
    const {loading} = this.state
    return (
      <div style={{ height:"100%"}}>
        {/*<h1>My Seating Map</h1>*/}
        <TableMap constructionMode={false} width={width} height={height} options={options} onSeatClicked={this.onSeatClicked}/>
        <Button type="primary" loading={this.state.loading} onClick={this.save}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({ 
    tables: state.tableMap.tables
}),
{}
)(App);