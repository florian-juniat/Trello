import React, {useState} from 'react';
import {Dimensions , View, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent, Button} from 'react-native';

import Colors from '../constants/Colors'

import Input from '../components/Input'


import axios from "axios";

const AddList = props => {

    const [nameList, setNameList] = useState("")
    const [idLabel, setIdLabel] = useState("0")
    const [nameUser, setNameUser] = useState("")

    const [page, setPage] = useState("home")

    var body = <View  style={{...style.body, marginTop: "20%"}}>
        <TouchableOpacity style={style.action} onPress={() => setPage("addList")}>
            <Text style={style.titleAction}>Ajouter une liste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={() => setPage("addPerson")}>
            <Text style={style.titleAction}>Ajouter une personne</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={() => setPage("setLabel1")}>
            <Text style={style.titleAction}>Ajouter un label</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={() => setPage("removePerson")}>
            <Text style={style.titleAction}>Retirer une personne</Text>
        </TouchableOpacity>
    </View>

    var arrow =  <Text style={{
        width: "20%"
    }}></Text>

    var title = "Paramètre tableau"

    if (page === "addList") {
        title = "Ajouter une liste"
        arrow = <TouchableOpacity onPress={() => setPage("home")} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>
        body = <View style={{...style.body, marginTop: "20%"}}>
        <Text>Nom de la nouvelle liste</Text>
            <Input 
            style={{color: "black", width: 200, borderBottomColor: 'black'}} 
            onChangeText={text => {
                setNameList(text)
            }
            } 
            value={nameList} />
            <TouchableOpacity style={{...style.action, marginTop: 40, elevation: 4}} 
                onPress={() => {
                    axios.post("http://" + props.ip + ":8080/board/" + props.id.toString() + "/add-list", {
                        namelist: nameList,
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                        if (res.status == 200) {
                            props.refreshPage()
                            props.close()
                        }
                    })
                }}>
                <Text style={style.titleAction}>Valider</Text>
            </TouchableOpacity>
        </View>
    }

    if (page == "addPerson") {
        title = "Ajouter une personne"
        arrow = <TouchableOpacity onPress={() => setPage("home")} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>
        body = <View style={{...style.body, marginTop: "20%"}}>
        <Text>Email de la personne</Text>
            <Input 
            style={{color: "black", width: 200, borderBottomColor: 'black'}} 
            onChangeText={text => {
                setNameUser(text)
            }
            } 
            value={nameUser} />
            <TouchableOpacity style={{...style.action, marginTop: 40, elevation: 4}} 
                onPress={() => {
                    axios.post("http://" + props.ip + ":8080/board/" + props.id.toString() + "/add-user", {
                        adduser: nameUser,
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                        if (res.status == 200) {
                            props.refreshPage()
                            props.close()
                        } else {
                            console.log("error")
                        }
                    })
                }}>
                <Text style={style.titleAction}>Valider</Text>
            </TouchableOpacity>
        </View>
    }

    if (page == "removePerson") {
        title = "Enlever une personne"
        arrow = <TouchableOpacity onPress={() => setPage("home")} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>
        body = <View style={{...style.body, marginTop: "20%"}}>
        <Text>Email de la personne</Text>
            <Input 
            style={{color: "black", width: 200, borderBottomColor: 'black'}} 
            onChangeText={text => {
                setNameUser(text)
            }
            } 
            value={nameUser} />
            <TouchableOpacity style={{...style.action, marginTop: 40, elevation: 4}} 
                onPress={() => {
                    axios.post("http://" + props.ip + ":8080/board/" + props.id.toString() + "/remove-user", {
                        removeuser: nameUser,
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                        if (res.status == 200) {
                            props.refreshPage()
                            props.close()
                        } else {
                            console.log("error")
                        }
                    })
                }}>
                <Text style={style.titleAction}>Valider</Text>
            </TouchableOpacity>
        </View>
    }

    if (page == "setLabel1") {
        title = "Modifier un label"
        arrow = <TouchableOpacity onPress={() => setPage("home")} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>
        body = <View style={{...style.body, marginTop: "5%"}}>
            {props.labels.map(item => 
            <TouchableOpacity onPress={() => {
                setPage("setLabel2")
                setIdLabel(item[0])
            }}
            style={{
                width: "50%",
                height: "13%",
                backgroundColor: Colors.labels[parseInt(item[0]) - 1],
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
                borderRadius: 5
            }}>
                <Text>{item[1]}</Text>
            </TouchableOpacity>
            )}
        </View>
    }

    if (page == "setLabel2") {
        title = "Modifier un label"
        arrow = <TouchableOpacity onPress={() => setPage("home")} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>
        body = <View style={{...style.body, marginTop: "20%"}}>
            <Text>Nom du label</Text>
            <Input 
            style={{color: "black", width: 200, borderBottomColor: 'black'}} 
            onChangeText={text => {
                setNameList(text)
            }
            } 
            value={nameList} />
            <TouchableOpacity style={{...style.action, marginTop: 40, elevation: 4}} 
                onPress={() => {
                    console.log("labelid : ", idLabel)
                    console.log("labelname : ", nameList)
                    axios.put("http://" + props.ip + ":8080/board/" + props.id.toString() + "/set-label", {
                        labelid: idLabel,
                        labelname: nameList
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                        if (res.status == 200) {
                            props.refreshPage()
                            props.close()
                        }
                    })
                }}>
                <Text style={style.titleAction}>Valider</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={{...style.container, left: "15%", top: props.top}}>
            <View style={{backgroundColor: "white", flex: 1, borderRadius: 20}}>
                <View style={style.bar}>
                    {arrow}
                    <Text style={{
                        textAlign: "center",
                        width: "60%",
                        fontSize: 15,
                    }}> {title} </Text>
                    <TouchableOpacity style={{width: "20%",  textAlign: "center", marginLeft: "10%"}}
                    onPress={props.close}>
                        <Text style={{fontSize: 20}}> &times; </Text>
                    </TouchableOpacity>
                </View>
                {body}
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        position: "absolute",
        width: "70%",
        height: 400,
        elevation: 100,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 20
    },
    bar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15
    },
    body: {
        flex: 8,
        alignItems: "center"
    },
    action: {
        backgroundColor: Colors.grayTrello,
        width: "80%",
        height: 40,
        borderRadius: 3,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    titleAction: {
        color: "white"
    }
});

export default AddList;