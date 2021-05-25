import { CONSTANTS } from '../actions';

export const addList = (namelist) => {
    return {
            type: CONSTANTS.ADD_LIST,
            payload: namelist
        }
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}

export const deleteList = listID => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: listID
    };
};