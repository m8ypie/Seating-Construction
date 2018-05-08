import TableMap from './Map'
import SeatingReducer from './state/seatingReducer'
import { updateSeat, loadSeatingMap } from './state/seatingActions'

const actions = {
  updateSeat: updateSeat,
  loadSeatingMap: loadSeatingMap
}

export {TableMap, SeatingReducer, actions}