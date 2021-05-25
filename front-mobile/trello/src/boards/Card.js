import React, {useState} from 'react';
import { ScrollView ,Image, View, StyleSheet, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';

import Colors from '../../constants/Colors'

import ImagePerson from '../../images/utiles/person.png'
import ImageLabel from '../../images/utiles/label.png'

import axios from "axios";

const Labels = props => {
    return (
        <View style={{
            backgroundColor: "#ECECEC", 
            position: "absolute", 
            width: "80%", 
            left: "10%", 
            height: "80%", 
            top: "10%",
            justifyContent: "center",
            alignItems: "center"
            }}>
            {props.value.labelsBoard.map(item => 
                <TouchableOpacity style={{
                    backgroundColor: Colors.labels[parseInt(item[0]) - 1],
                    width: "80%",
                    height: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                }}>
                <Text style={{
                    color: "white",

                }} >{item[1]}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}


const Card = props => {

    console.log("=====")
    console.log(props.infoCard)
    console.log("=====")

    const [borderInputDescription, setBorderInputDescription] = useState(false)

    const [description, setDescription] = useState(props.infoCard.description)

    const [hide, setHide] = useState(false)
    const [hidePerson, setHidePerson] = useState(false)


    const handleLabel = () => {
        setHide(true)
    }

    const handleModifyLabel = item => {
        
        if (props.infoCard.labels.filter(element => element[0] === item[0]).length > 0) {
            axios.post("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/unlabelize-card", {
                cardid: props.infoCard.id,
                labelid: item
                }, {headers: { Authorization: props.token } }).then(function(res) {
                if (res.status == 200) {
                    props.setPage("board")
                }
            })
        } else {
            axios.put("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/labelize-card", {
                cardid: props.infoCard.id,
                labelid: item
                }, {headers: { Authorization: props.token } }).then(function(res) {
                if (res.status == 200) {
                    props.setPage("board")
                }
            })
        }
    }

    var label = <TouchableOpacity onPress={handleLabel}>
    <View style={style.containerPeople}>
        <Image style={{height: 40, width: 40, marginRight: 30}} source={ImageLabel}/>
         {props.infoCard.labels.map(item => 
            <Text style={{
                backgroundColor: Colors.labels[parseInt(item) - 1],
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginHorizontal: 5,
                height: 30,
                color: "white",
                fontSize: 15,
                borderRadius: 10
            }}>{props.infoCard.labelsBoard[parseInt(item) - 1][1]}</Text>    
        )}
    </View>
    </TouchableOpacity>

    if (hide) {
        label = <View style={{
            flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 30
        }}>
            <Image style={{height: 40, width: 40, marginRight: 30}} source={ImageLabel}/>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                {props.infoCard.labelsBoard.map(item => 
                    <TouchableOpacity style={{
                        backgroundColor: Colors.labels[parseInt(item[0]) - 1],
                        width: 250,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 5,
                        borderRadius: 5,
                    }}
                    onPress={() => handleModifyLabel(item[0])}
                    >
                    <View style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Text style={{
                            color: "white",
                            width: "50%"

                        }} >{item[1]}</Text>
                        <Text style={{color: "white", marginLeft: 10, fontSize: 40, marginBottom: 30}}>
                            {props.infoCard.labels.filter(element => element[0] === item[0]).length > 0 ? ".": ""}
                            </Text>
                    </View>
                    </TouchableOpacity>
                )}
                <Button title="Terminer" color={Colors.greenTrello} onPress={() => setHide(false)} />
            </View>

        </View>
    }


    var person = <View style={style.containerPeople}>
    <Image style={{height: 50, width: 50, marginRight: 30}} source={ImagePerson}/>
    {props.infoCard.memb_id.map(item => 
    <Text style={style.bubbles}>{item.name.toUpperCase()[0]}</Text>
    )}
    <TouchableOpacity onPress={() => setHidePerson(true)}>
        <Text style={{...style.bubbles, backgroundColor: Colors.greenTrello }}>+</Text>
    </TouchableOpacity>

</View>


        const handleAddPerson = item => {
            console.log("________")
            console.log("id person : ", item.id)
            console.log("id card : ", props.infoCard.id)
            console.log("id board : ", props.infoCard.boardId)


            if (props.infoCard.memb_id.filter(person => person.id == item.id).length == 0) {

                axios.post("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/asign-user", {
                    userid: item.id,
                    cardid: props.infoCard.id
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                    if (res.status == 200) {
                        props.setPage("board")
                    }
                })
            } else {
                axios.post("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/unasign-user", {
                    userid: item.id,
                    cardid: props.infoCard.id
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                    if (res.status == 200) {
                        props.setPage("board")
                    }
                })
            }
        }


    if (hidePerson) {
        person = <View style={{
            flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 30
        }}>
            <Image style={{height: 40, width: 40, marginRight: 30}} source={ImagePerson}/>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                {props.infoCard.memb_id_Board.map(item => 
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        width: 250,
                        height: 50,
                        backgroundColor: Colors.grayTrello,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 5
                    }} onPress={() => handleAddPerson(item)} >
                        <Text style={{
                            color: "white",
                            marginLeft: 10
                        }}>{item.name}</Text>
                        <Text style={{
                            color: "white",
                            marginBottom: 30,
                            fontSize: 40,
                            marginRight: 20
                        }}>
                            {props.infoCard.memb_id.filter(person => person.id == item.id).length > 0 ? "." : ""}
                        </Text>
                    </TouchableOpacity>    
                )}
                <View style={{marginTop: 20}}>
                <Button title="Terminer" color={Colors.greenTrello} onPress={() => setHidePerson(false)}/>
                </View>
            </View>
            </View>
    }



    const handleChangeDescription = text => {
        axios.post("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/description", {
            cardid: props.infoCard.id,
            description: text
            }, {headers: { Authorization: props.token } }).then(function(res) {
            if (res.status == 200) {
                console.log("change description")
                setDescription(text)
            }
        })
    }


    var n = 0

    return (
    <View style={style.container}>
        <View style={{...style.bar}}>
            <View style={style.barTop}>
                <TouchableOpacity style={style.cote} onPress={() => props.setPage("board")}>
                    <Text style={style.text}>&larr;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.cote} onPress={() => {}}>
                    <Text style={style.text}>...</Text>
                </TouchableOpacity>
            </View>
            <View style={style.barTitle}>
                <Text style={style.title}>{props.infoCard.title}</Text>
            </View>
        </View>
        <KeyboardAvoidingView behavior={'height'} 
    keyboardVerticalOffset={n} style={{...style.body}}>
            <View style={{...style.textinput, flexDirection: "row", justifyContent: "space-between"}}>
                <TextInput 
                onBlur={() => setBorderInputDescription(false)}
                onFocus={() => setBorderInputDescription(true)}
                style={{...style.inputDescription, width: 200,
                    borderBottomWidth: borderInputDescription ? 3 : 0,
                    borderBottomColor: "#30C102"}}
                value={description}
                onChangeText={text => setDescription(text)}
                />
                <TouchableOpacity onPress={() => handleChangeDescription(description)}
                style={{justifyContent:"center",
                marginRight: 40,
                backgroundColor: Colors.greenTrello, 
                height: 50, width: 100,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                borderRadius: 10
                }}>
                    <Text style={{color: "white", fontWeight:"bold"}}>Valider</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{flex: 1}}>
                {label}
                {person}
                
            </ScrollView>
            
        </KeyboardAvoidingView>
        <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ECECEC",
                    flex: 1
                }}>
                    <Button title="Supprimer carte" color="red"  onPress={() => {
                        axios.post("http://" + props.ip + ":8080/board/" + props.infoCard.boardId.toString() + "/remove-card", {
                            id: props.infoCard.id
                            }, {headers: { Authorization: props.token } }).then(function(res) {
                            if (res.status == 200) {
                                props.setPage("board")
                            }
                        })
                    }}/>
                </View>
    </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        flex: 2
    },
    containerPeople: {
        flex: 1,
        marginTop: 50,
        flexDirection: "row",
        marginHorizontal: 30,
        marginBottom: 30
    },
    bar: {
        flex: 1,
        backgroundColor: Colors.blueTrello,
        width: "100%",
        paddingTop: 50,
    },
    barTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 30
    },
    barTitle: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 6,
        width: "100%",
        backgroundColor: "#ECECEC"
    },
    title: {
        color: "white",
        fontSize: 20
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    textinput: {
        backgroundColor: "white",
        height: 90,
        elevation: 3,
        justifyContent: "center"
    },
    inputDescription: {
        marginHorizontal: 20,
    },
    bubbles: {
        backgroundColor: "gray",
        padding: 2,
        borderRadius: 100,
        width: 50,
        height: 50,
        textAlign: "center",
        justifyContent: "center",
        paddingTop: 10,
        color: "white",
        margin: 1,
        fontSize: 20,
        marginRight: 5
    }
});

export default Card;