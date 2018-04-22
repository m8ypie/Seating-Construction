
export const TABLE_ADDED = 'TABLE_ADDED'
export const TABLE_REMOVED = 'TABLE_REMOVED'
export const TABLE_UPDATED = 'TABLE_UPDATED'
export const SELECTED_TABLE = 'SELECTED_TABLE'

export const addTable = (id, table) => {
    return { type: TABLE_ADDED, id:id, table:table }
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