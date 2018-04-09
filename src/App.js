import React, { Component } from "react";
import ReactDOM from "react-dom";
import Map from "./Map"
import '../node_modules/antd/dist/antd.css'

const height = 940;
const width = 1262;
const options = {
  backgroundColor: 0xdfdfdf,
};


class App extends Component {

  render() {
    //const {width, height, options} = this.props
    return (
      <div style={{ height:"100%"}}>
        {/*<h1>My Seating Map</h1>*/}
        <Map width={width} height={height} options={options}/>
      </div>
    );
  }
}

export default App;
