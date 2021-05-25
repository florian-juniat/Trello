import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent, Dialog, DialogTitle, ListItem, DialogContentText } from "@material-ui/core";
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button';
import {deleteCard} from '../../actions';
import axios from 'axios';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { List } from '@material-ui/core';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar'

const CardContainer = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 100%;
    word-wrap: break-word;
`;

const OptionButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const styl = theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
          },
    }
})
const TrelloCard = (props) => {
    const {text, id, listID, index, dispatch } = props;
    //const { onClose, selectedValue } = props;
    const [open, setOpen] = React.useState(false);
    const [openLabel, setOpenL] = React.useState(false);
    const [openMemb, setOpenM] = React.useState(false);
    const [shown, setShown] = React.useState(false);
    const [shownL, setShownL] = React.useState(false);
    const handleCloseL = () => {
        setOpenL(false);
    }
    const handleCloseM = () => {
        setOpenM(false);
    }
    const handleClose = () => {
        setOpen(false);
      };
    const chooseLabel= () => {
        setOpen(false);
        setOpenL(true);
    }
    const changeMembers = () => {
        setOpen(false);
        setOpenM(true);
        const boardId = sessionStorage.getItem('board');
        const token = sessionStorage.getItem('token');
        axios.post("http://127.0.0.1:8080/board/" + boardId + "/asign-user", {
            userid: 1,
            cardid: id
            }, {headers: { Authorization : token }}
        ).then (res => {
            alert("member added");
        })
    }
    const showT = () => {
        setOpenM(false);
        setShown(true);
    }
    const showL = () => {
        setOpenL(false);
        setShownL(true);
    }
    const handleDeleteCard = () => {
        const cardId = id.split("-")[1];
        const token = sessionStorage.getItem('token');
        const boardId = sessionStorage.getItem('board');
        dispatch(deleteCard(id, listID));
        axios.post("http://127.0.0.1:8080/board/" + boardId + "/remove-card", {
            id: cardId + 1 },
            {
                headers: { Authorization : token }
        }).then(res => {
            alert("card removed");
        });
      };
    const Avatars = () => {
        if (shown == true) {
            return (<Avatar style={{
                color: "white",
                backgroundColor: "orange",
            }}>T</Avatar>)
        } else return(<div></div>);
    }
    const Labels = () => {
        if (shownL == true) {
            return (<Avatar variant = "square" style={{
                color: "white",
                backgroundColor: "red"
                }}> <br/>
                </Avatar>);
        }
        else return (<div></div>);
    }
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
        <div>
        <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
        <Card>
            <OptionButton
                onClick={() => setOpen(true)}
                fontSize="small"
            >
                <TuneSharpIcon/>
            </OptionButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><h1>Carte {text}</h1></DialogTitle>
                <DialogContentText>Description</DialogContentText>
                <List>
                    <div styles={styl.root}>
                    <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                    >
                        <Button>Changer la description</Button>
                        <Button onClick={chooseLabel}>Modifier les étiquettes</Button>
                        <Button onClick={changeMembers}>Modifier les membres</Button>
                    </ButtonGroup>
                    </div>
                </List>
            </Dialog>
            <Dialog open={openMemb} onClose={handleCloseM}>
                <DialogTitle><h1>Carte {text}: Membres</h1></DialogTitle>
                <List>
                    <div styles={styl.root}>
                    <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                    >
                        <Button onClick={showT}>
                            <Avatar style={{
                            color: "white",
                            backgroundColor: "orange",
                            }}>T
                            </Avatar>
                        </Button>
                        <br/>
                        <Button>Cliquez sur un membre pour l'ajouter</Button>
                    </ButtonGroup>
                    </div>
                </List>
            </Dialog>
            <Dialog open={openLabel} onClose={handleCloseL}>
                <DialogTitle><h1>Carte {text}: Labels</h1></DialogTitle>
                <List>
                    <div styles={styl.root}>
                    <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                    >
                        <Button onClick={showL}>
                            <Avatar variant = "square" style={{
                            color: "white",
                            backgroundColor: "red"
                            }}> <br/>
                            </Avatar>
                        </Button>
                        <Button onClick={showL}>
                            <Avatar variant = "square" style={{
                            color: "white",
                            backgroundColor: "yellow"
                            }}> <br/>
                            </Avatar>
                        </Button>
                        <Button onClick={showL}>
                            <Avatar variant = "square" style={{
                            color: "white",
                            backgroundColor: "green"
                            }}> <br/>
                            </Avatar>
                        </Button>
                        <Button onClick={showL}>
                            <Avatar variant = "square" style={{
                            color: "white",
                            backgroundColor: "blue"
                            }}> <br/>
                            </Avatar>
                        </Button>
                        <br/>
                        <Button>Cliquez sur un label pour l'ajouter</Button>
                    </ButtonGroup>
                    </div>
                </List>
            </Dialog>
            <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
                <DeleteIcon/>
            </DeleteButton>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{text}</Typography> 
                <Avatars/>
                <Labels/>
            </CardContent>
        </Card>
        </CardContainer>
        </div>)}
        
      </Draggable>
    );
}
export default TrelloCard;