import React, { Component, useState } from 'react';
import axios from "axios";
import TrelloList from './List/TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from '../components/TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, deleteList } from '../actions';
import styled from "styled-components";
import { addList, addCard } from "../actions";
import Avatar from '@material-ui/core/Avatar'
import theme from '../theme'

import Im1 from '../paysage/1.jpg';
import Im2 from '../paysage/2.jpg';
import Im3 from '../paysage/3.jpg';
import Im4 from '../paysage/4.jpg';
import Im5 from '../paysage/5.jpg';
import Im6 from '../paysage/6.jpg';
import Im7 from '../paysage/7.jpg';
import Im8 from '../paysage/8.jpg';
import Im9 from '../paysage/9.jpg';
import { classes } from 'istanbul-lib-coverage';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
`
class Board extends Component {
    constructor(props){
        super (props);
        this.state = {
            board: {},
            cards:[],
            chargedLists:null
        };
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8080/board/" + this.props.boardIndex, {
            headers: { Authorization: sessionStorage.getItem('token') }
        }).then (res => {
            this.setState({board: res.data.board, cards: res.data.cards});
            this.chargingList();
        })
    }
    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        
        if(!destination) {
            return;
        }
        this.props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    }
    chargingList = () => {
        const { dispatch } = this.props;
        const chargedLists = new Array();
        dispatch(deleteList("list-0"));
        this.state.board.list.map((l, index) => {
            dispatch(addList(l));
            var temp = {
                namelist: l,
                id: `list-${index + 1}`
            }
            chargedLists.push(temp);
        });
        this.state.cards.map((card, index) => {
            var ok = chargedLists.find(list => card.list == list.namelist);
            dispatch(addCard(ok.id, card.name))
        })
    }
    showMembers = (memb) => {
        return (<Avatar style={{
            color: "white",
            backgroundColor: "orange",
          }}>T</Avatar>)

    }
    /*
    showLabels = () => {
        return ()
    }*/
    render() {
        const { lists } = this.props;
        const { boardIndex, picture, name} = this.props;
        const memb_id = sessionStorage.getItem('members');
        const { dispatch } = this.props;
        var AllContainer;
        if (picture == 1) {
            AllContainer = styled.div`
                background-image: url(${Im1});
                border: 1px solid #000;
                width: 2000px;
                height: 2000px;
        `
        } else if (picture == 2) {
        AllContainer = styled.div`
            background-image: url(${Im2});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        } else if (picture == 3) {
        AllContainer = styled.div`
            background-image: url(${Im3});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        }
        else if (picture == 4) {
        AllContainer = styled.div`
            background-image: url(${Im4});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        }
        else if (picture == 5) {
        AllContainer = styled.div`
            background-image: url(${Im5});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        } else if (picture == 6) {
        AllContainer = styled.div`
            background-image: url(${Im6});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        }
        else if (picture == 7) {
        AllContainer = styled.div`
            background-image: url(${Im7});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        } else if (picture == 8) {
        AllContainer = styled.div`
            background-image: url(${Im8});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        } else if (picture == 8) {
        AllContainer = styled.div`
            background-image: url(${Im9});
            border: 1px solid #000;
            width: 2000px;
            height: 2000px;
        `
        }
        if (this.props.boardIndex)
            return (
                <AllContainer>
                    <h1>{name}</h1>{this.showMembers(memb_id)}<br/><br/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                    {provided => (
                    <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, index) => (
                        <TrelloList
                            listID={list.id}
                            key={list.id}
                            title={list.namelist}
                            cards={list.cards}
                            index={index}
                            dispatch={dispatch}
                        />
                    ))}
                    {provided.placeholder}

                    <TrelloActionButton
                        list
                        boardIndex={boardIndex}
                    />
                    </ListContainer>
                    )}
                    </Droppable>
                </div>
                </DragDropContext>
                </AllContainer>
            )
    }
}

const mapStateToProps = state => ({
    lists: state.lists
})

export default connect(mapStateToProps)(Board);