import {
    TABLE_ADDED,
    TABLE_REMOVED,
    TABLE_UPDATED,
    SELECTED_TABLE
} from './seatingActions'

const initialState = {
    windowWidth:0,
    windowHeight:0,
    tableIds:[],
    tables:{},
    selectedTable: false
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
        default:
            return state
    }
}