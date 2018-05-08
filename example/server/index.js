var express = require("express")
var app = express()
var bodyParser = require('body-parser')
const cors = require("cors");
var seatingController = require('./seatingController')
app.use(cors())
app.use(bodyParser())

app.post("/seating", (req, res) => {
  const newSeatingChart = req.body
  seatingController.saveSeatingChart(newSeatingChart)
  res.status(200).send(newSeatingChart)
})

app.get("/seating", (req, res) => {
  const seatingChart = seatingController.loadSeatingChart()
  res.status(200).send(seatingChart)
})

app.listen(1337)