
export const TABLE_ADDED = 'TABLE_ADDED'
export const TABLE_REMOVED = 'TABLE_REMOVED'
export const TABLE_UPDATED = 'TABLE_UPDATED'
export const SELECTED_TABLE = 'SELECTED_TABLE'
export const CANVAS_RESIZE = 'CANVAS_RESIZE'
export const CONSTRUCTION_MODE = 'CONSTRUCTION_MODE'
export const UPDATE_SEAT = 'UPDATE_SEAT'
export const LOAD_SEATING_MAP = 'LOAD_SEATING_MAP'

export const addTable = (id, table) => {
    return { type: TABLE_ADDED, id:id, table:table }
}

export const setConstructionMode = (inConstructionMode) => {
    return { type: CONSTRUCTION_MODE, constructionMode:inConstructionMode }
}

export const removeTable = (id) => {
    return {type: TABLE_REMOVED, id: id}
}

export const updateTable = (id, newTableValue) => {
    return { type: TABLE_UPDATED, id:id, table:newTableValue }
}

export const selectTable = (id) => {
    return { type: SELECTED_TABLE, id:id }
}

export const updateSeat = (tableId, seatId, newSeatValue) => {
    return { type: UPDATE_SEAT, tableId: tableId, seatId: seatId, newSeatValue }
}

export const loadSeatingMap = (seatingMap) => {
    return { type: LOAD_SEATING_MAP, tables: seatingMap.tables, tableIds: seatingMap.tableIds }
}

export const resizeCanvas = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    return { type: CANVAS_RESIZE, width:width, height:height }
}