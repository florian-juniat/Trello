import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'
import TextArea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { addList, addCard } from "../actions";
import axios from 'axios';

class TrelloActionButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formOpen: false,
            text: "",
            board: {},
            list: []
        }
    }
    openForm = () => {
        this.setState({
            formOpen: true
        });
    }
    closeForm = () => {
        this.setState({
            formOpen: false
        });
    }
    renderAddButton = () => {
        const { list } = this.props;
        const buttonText = list ? "Ajouter une autre liste" : "Ajouter une autre carte";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0, 0, 0, .15)" : "inherit";
        return (
            <div 
                onClick={this.openForm}
                style={{
                    ...styl.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    background: buttonTextBackground
                    }}>
                <AddIcon/>
                {buttonText}
            </div>
        )

    };
    renderForm = () => {
        const {list} = this.props;
        const placeholder = list ? "Saisissez le titre de la liste..." : "Saisissez un titre pour cette carte..."
        const buttonTitle = list ? "Ajouter une liste" : "Ajouter une carte";
        return(
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px, 8px 2px"
                }}>
                    <TextArea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            outlined: "none",
                            border: "none",
                            overflow: "hidden"
                        }}
                    />
                </Card>
                <div style={styl.openFormButtonGroup}>
                    <Button
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant="contained"
                        style={{ color:"white", backgroundColor: "#5aac44"}}>
                        {buttonTitle}{" "}
                    </Button>
                    <CloseIcon onClick={this.closeForm} style={{ marginLeft: 8, cursor: "pointer"}}/>
                </div>
            </div>
        )
    }
    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }
    handleAddCard = async () => {
        const { dispatch, listID } = this.props;
        const boardI = sessionStorage.getItem('board');
        const token = sessionStorage.getItem('token');
        const {text} =this.state;

        if (text) {
            this.setState({text: ""})
            dispatch(addCard(listID, text));
            axios.post("http://127.0.0.1:8080/board/" + boardI + "/add-card", {
                name: text,
                namelist: listID
            }, { headers: { Authorization: token }
            }).catch(err => {
                alert(err);
            })
        }
        return;
    }
    handleAddList = () => {
        const { dispatch } = this.props;
        const {text} = this.state;
        const boardI = this.props.boardIndex;
        const token = sessionStorage.getItem('token');
        
        if (text) {
            this.setState({text: ""});
            dispatch(addList(text));
            axios.post("http://127.0.0.1:8080/board/" + boardI + "/add-list", {
                namelist: text
            }, { headers: { Authorization: token }
            })
        }
        return;
    }
    render() {
        //alert(this.props.boardIndex)
        //return (<h1>{this.props.boardIndex}</h1>)
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const styl = {
    openFormButtonGroup: {
        display:"flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItem: "center"
    }
}

export default connect() (TrelloActionButton);