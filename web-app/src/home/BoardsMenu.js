import React, { Component, useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Board from '../boards/Board';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createBrowserHistory } from 'history';

import Im1 from '../paysage/1.jpg';
import Im2 from '../paysage/2.jpg';
import Im3 from '../paysage/3.jpg';
import Im4 from '../paysage/4.jpg';
import Im5 from '../paysage/5.jpg';
import Im6 from '../paysage/6.jpg';
import Im7 from '../paysage/7.jpg';
import Im8 from '../paysage/8.jpg';
import Im9 from '../paysage/9.jpg';
import Avatar from '@material-ui/core/Avatar';
import { styles } from '../theme/styles';
import { List, ListItem, ListItemIcon, ListItemText, ThemeProvider } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';

export default class BoardsMenu extends Component {
    state = {
        charged: 0,
        open: false,
        boards: [],
        picture: "1",
        name: "trelllooo",
        boardChosen: 0,
        memb_id: {},
        mystyles : {
            nameBoard : {
                color : "black",
                fontSize : "30px"
            },
            picBoard : {
                marginLeft : "350px",
            },
            buttonBoard : {
                marginLeft : "950px",
                color : "white",
                border: "1px solid #54aa40",
                fontSize : "30px",
                borderRadius: "10px",
                backgroundColor : "#54aa40"
            },
            allBoards : {
                backgroundColor : "#FFFCFC",
                border: "2px solid #E2DBD9",
                padding: "20px", 
                width: "1000px",
                marginLeft : "500px",
                overflow: "auto",
                borderRadius: "20px",
            }
        }
    }
    getBoards() {
        const token = sessionStorage.getItem('token');
        axios.get("http://127.0.0.1:8080/home/", {
            headers:
                { Authorization: token }
        }).then(res => {
            var chargedBoards = [];
            if (res.data != 0)
                for (var i = 0; i < res.data.length; i++) {
                    chargedBoards.push({
                        key: res.data[i].id,
                        name: res.data[i].name,
                        member_id: res.data[i].picture
                    })
                }
            this.setState({ boards: chargedBoards, charged: 1 }); 
        })
    }
    addBoards(name, picture) {
        const token = sessionStorage.getItem('token');
        axios.post("http://127.0.0.1:8080/home/add-board", {
            name: name,
            picture: parseInt(picture),
        }, { headers: { Authorization: token } }
        ).then(res => {
            alert("board added");
            this.handleOpen(false);
            this.getBoards();
        });
    }
    handleOpen(open) {
        this.setState({ open: open });
    };
    handlePicture(pic) {
        this.setState({ picture: pic });
    }
    searchIdFromName(name) {
        this.state.boards.map((board, index) => {
            if (board.name == name) {
                this.setState({boardChosen: board.key, name: board.name})
            }
        });
        return;   
    }
    displayBoards() {
        const boards = this.state.boards;
        const rows = boards.map((board, index) => {
            return (
                <ListItem button onClick={() => this.searchIdFromName(board.name)}>
                    <ListItemIcon><CalendarIcon/></ListItemIcon>
                    <h1 style={this.state.mystyles.nameBoard}>{board.name}<br></br></h1>
                </ListItem>
            );
        });
        return (
            <div>
                <div style={{backgroundColor : "#287bf1", height: "100px"}}>
                    <h1 style={{marginLeft: "830px", color : "white", padding: "20px"}}>Menu des boards</h1>
                </div>
                <br/><br/>
                <List>
                    {rows}
                </List>
            </div>
        )
    }
    render() {
        if (this.state.boardChosen != 0) {
            sessionStorage.setItem('board', this.state.boardChosen);
            return (
                <Board boardIndex =
                    {this.state.boardChosen}
                    picture = {this.state.picture}
                    name = {this.state.name}
                />
            );
        }
        if (this.state.charged == 0)
            return (
                <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                Bienvenue !
                <Button
                    onClick = {() => {this.getBoards()}}
                >
                    Accéder aux boards
                </Button>
                </div>
                </ThemeProvider>
            );
        else if (this.state.charged == 1)
            return (
                <div> {this.displayBoards()}
                <CssBaseline />
                <Button onClick={() => this.handleOpen(true)}>Ajouter</Button>
                <Dialog open={this.state.open} onClose={() => this.handleOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Ajouter une nouvelle board</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Cliquez sur "Ajouter" pour créer cette board.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nom de la board:"
                            type="text"
                            fullWidth
                        />
                        <div><br/><br/></div>
                        Thème:<br/>
                        <div className = {styles.root}>
                        <ToggleButtonGroup
                        value={this.state.picture}
                        exclusive
                        >
                            <ToggleButton value="1" onClick = {() => this.handlePicture("1")}>
                                <Avatar src={Im1}/>
                            </ToggleButton>
                            <ToggleButton value="2" onClick = {() => this.handlePicture("2")}>
                                <Avatar src={Im2}/>
                            </ToggleButton>
                            <ToggleButton value="3" onClick = {() => this.handlePicture("3")}>
                                <Avatar src={Im3}/>
                            </ToggleButton>
                            <ToggleButton value="4" onClick = {() => this.handlePicture("4")}>
                                <Avatar src={Im4}/>
                            </ToggleButton>
                            <ToggleButton value="5" onClick = {() => this.handlePicture("5")}>
                                <Avatar src={Im5}/>
                            </ToggleButton>
                            <ToggleButton value="6" onClick = {() => this.handlePicture("6")}>
                                <Avatar src={Im6}/>
                            </ToggleButton>
                            <ToggleButton value="7" onClick = {() => this.handlePicture("7")}>
                                <Avatar src={Im7}/>
                            </ToggleButton>
                            <ToggleButton value="8" onClick = {() => this.handlePicture("8")}>
                                <Avatar src={Im8}/>
                            </ToggleButton>
                            <ToggleButton value="9" onClick = {() => this.handlePicture("9")}>
                                <Avatar src={Im9}/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleOpen(false) } color="primary">
                            Annuler
                        </Button>
                        <Button onClick={() => this.addBoards(document.getElementById('name').value, this.state.picture) } color="primary">
                            Ajouter
                        </Button>
                    </DialogActions>
                </Dialog>
                </div>
            );
    }
}