import React, { Component } from "react";
import ReactDOM from "react-dom";
import TableMap from "./Map"
import '../node_modules/antd/dist/antd.css'

const height = "100%";
const width = "100%";
const options = {
  backgroundColor: 0xdfdfdf,
};


class App extends Component {

  onSeatClicked(tableId, seatId){
    console.log("Seat Clicked",tableId, seatId)
  }

  render() {
    //const {width, height, options} = this.props
    return (
      <div style={{ height:"100%"}}>
        {/*<h1>My Seating Map</h1>*/}
        <TableMap width={width} height={height} options={options} onSeatClicked={this.onSeatClicked}/>
      </div>
    );
  }
}

export default App;
