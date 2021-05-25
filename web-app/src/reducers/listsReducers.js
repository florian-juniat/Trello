import {CONSTANTS} from '../actions';
import axios from 'axios';

let listID = 1;
let cardID = 1;

const initialState = [
    {
        namelist: "Exemple",
        id: "list-0",
        cards: [
            {
                id: "card-0",
                text: "Tu peux me bouger !"
            }
        ]
    }
];


const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST: {
            const newList = {
                namelist: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return ([...state, newList]);
        }
        case CONSTANTS.DELETE_LIST:
        {
            const listID = action.payload;
            const newState = state;
            var i = 0;
            state.map((list, index) => {
                if (list.namelist == listID) {
                    i = index;
                }
            });
            newState.splice(i, 1);
            //alert(newState);
            //delete newState[lol];
            return newState;
            //return (final);
            
        }
        case CONSTANTS.ADD_CARD:
        {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;
            const newState = state.map(list => {
                if (list.id === action.payload.listID)
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                else
                    return list;
            });
            return (newState);
        }
        case CONSTANTS.DELETE_CARD:
        {
            const { cardID, listID } = action.payload;
            var i = 0;
            state.map((list, index) => {
                if (list.namelist == listID)
                    i = index;
            })
            const list = state[i];
            const cards = state[i].cards;
            var k = 0;
            cards.map((card, index) => {
                if (card.id == cardID) {
                    k = index;
                    //alert (card.id + " " + k)
                }
            })
            const newCards = cards.splice(k - 1, 1);
            /*newCards.map((card, index) => {
                alert(card.text)
            })*/
            return state;
            //return ([...state[i], { ...list, cards: newCards }])
            
        }
        case CONSTANTS.DRAG_HAPPENED:
        {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];

            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return (newState);
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart == list.id)
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            else if (droppableIdStart != droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart == list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd == list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
            return newState;
        }
        default:
            return state;
    }
};

export default listsReducer;