import {
    TABLE_ADDED,
    TABLE_REMOVED,
    TABLE_UPDATED,
    SELECTED_TABLE,
    CANVAS_RESIZE,
    CONSTRUCTION_MODE,
    UPDATE_SEAT,
    LOAD_SEATING_MAP
} from './seatingActions'

const initialState = {
    windowWidth: window.innerWidth-418,
    windowHeight: window.innerHeight,
    tableIds:[],
    tables:{},
    selectedTable: false,
    constructionMode:false
}

export default (state = initialState, action) => {
    switch(action.type){
        case TABLE_ADDED:
            return {
                ...state,
                tables:{
                    ...state.tables,
                    [action.table.id]: action.table
                },
                tableIds: [...state.tableIds, action.table.id]
            }
        case TABLE_UPDATED:
            return {
                ...state,
                tables:{
                    ...state.tables,
                    [action.id]: action.table
                }
            } 
        case SELECTED_TABLE:
            return {
                ...state,
                selectedTable: action.id
            }
        case CANVAS_RESIZE:
            return {
                ...state,
                windowHeight: action.height,
                windowWidth: action.width - 418
            }
        case CONSTRUCTION_MODE:
            return {
                ...state,
                constructionMode: action.constructionMode
            }
        case UPDATE_SEAT:
            const table = state.tables[action.tableId]
            const seat = {
                ...table.seats[action.seatId],
                label:action.label,
                reserved:action.reserved
            }
            table.seats[action.seatId] = seat
            return {
                ...state,
                tables:{
                    ...tables,
                    [action.tableId]: table
                }
            }
        case LOAD_SEATING_MAP:
            const tables = action.tables || {}
            const tableIds = action.tableIds || []
            return {
                ...state,
                tables: tables,
                tableIds: tableIds
            }
        default:
            return state
    }
}