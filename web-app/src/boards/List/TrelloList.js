import React from 'react';
import TrelloCard from '../Cards/TrelloCard'
import TrelloActionButton from '../../components/TrelloActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { deleteList } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

const TrelloList = (props) => {
    const {title, cards, listID, index, dispatch} = props;
    const handleDeleteList = () => {
        const token = sessionStorage.getItem('token');
        const boardId = sessionStorage.getItem('board');
        dispatch(deleteList(listID));
        axios.post("http://127.0.0.1:8080/board/" + boardId + "/remove-list", {
            namelist: title },
            {
                headers: { Authorization : token }
        }).then(res => {
            alert("list removed");
        });   
    };
    return (
        <Draggable draggableId={String(listID)} index={index}>
        {provided => (
        <ListContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
        >
        <Button
            onClick={handleDeleteList}
            style = {{float: "right"}}
        > <CloseIcon/>
        </Button>
        <Droppable droppableId={String(listID)}>
        {(provided) => (
        <div
            {...provided.droppableProps}
            ref={provided.innerRef}
        >
        <ListTitle>{title}</ListTitle>
        {cards.map((card, index) => (
            <TrelloCard
                key={card.id}
                index={index}
                text={card.text}
                id={card.id}
                dispatch={dispatch}
            />
        ))}
        <TrelloActionButton listID={listID} />
        {provided.placeholder}
        </div>
        )}
        </Droppable>
        </ListContainer>
        )}
        </Draggable>
    )
}

export default connect() (TrelloList);