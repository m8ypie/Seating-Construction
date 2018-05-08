
let global = {}


function saveSeatingChart(seatingChart){
  global = seatingChart
}

function loadSeatingChart(){
  return global
}

module.exports = { saveSeatingChart, loadSeatingChart }