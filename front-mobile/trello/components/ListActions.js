import React, {useState} from 'react';
import {Dimensions , View, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent, Button} from 'react-native';

import Colors from '../constants/Colors'

import Input from '../components/Input'

import axios from "axios";

const ListActions = props => {

    const [nameNewCard, setNameNewCard] = useState("")

    const sortAlpha = () => {
        props.sortBy(props.value.key, "alpha")
        props.close()
    }

    const sortNb = () => {
        props.sortBy(props.value.key, "nbPerson")
        props.close()
    }

    const goToBasic = () => {
        setName("List actions")
        setArrow(<Text style={{
            width: "20%"
        }}></Text>)
    }

    const handleSetName = text => {
        setNameNewCard(text)
    }


    const addCard = () => {
        setName("Ajout carte")
        setArrow(<TouchableOpacity onPress={goToBasic} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>)
    }

    const delListe = () => {
        setName("Supprimer liste")
        setArrow(<TouchableOpacity onPress={() => {
            goToBasic()
        }} style={{
            width: "20%"
        }}><Text>&larr;</Text></TouchableOpacity>)
    }

    const [name, setName] = useState("Liste actions")
    const [arrow, setArrow] = useState(
        <Text style={{
            width: "20%"
        }}></Text>
    )
    var body = <View style={style.body}>
        <TouchableOpacity style={style.action} onPress={addCard}>
            <Text style={style.titleAction}>Ajouter une carte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={delListe}>
            <Text style={style.titleAction}>Supprimer la liste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={sortAlpha}>
            <Text style={style.titleAction}>Trier par ordre alphabétique</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.action} onPress={sortNb}>
            <Text style={style.titleAction}>Trier par le nombre de personne</Text>
        </TouchableOpacity>
    </View>

    if (name == "Ajout carte") {
        body = <View style={{...style.body, marginTop: "20%" }}>
        <Text>Nom de la carte</Text>
        <Input 
        style={{color: "black", width: 200, borderBottomColor: 'black'}} 
        onChangeText={text => {
            handleSetName(text)
        }
        } 
        value={nameNewCard} />
        <TouchableOpacity style={{...style.action, marginTop: 40, elevation: 4}} 
            onPress={() => {
                axios.post("http://" + props.ip + ":8080/board/" + props.id.toString() + "/add-card", {
                        namelist: props.value.title,
                        name: nameNewCard
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

    if (name == "Supprimer liste") {
        body = <View style={{...style.body, marginTop: "20%" }}>
        <TouchableOpacity style={{...style.action, marginTop: 40, backgroundColor: "red", elevation: 12}} 
            onPress={() => {
                axios.post("http://" + props.ip + ":8080/board/" + props.id.toString() + "/remove-list", {
                        namelist: props.value.title,
                    }, {headers: { Authorization: props.token } }).then(function(res) {
                        if (res.status == 200) {
                            props.refreshPage()
                            props.close()
                        }
                })
                props.refreshPage()
                props.close()
            }}>
            <Text style={style.titleAction}>Valider la suppression</Text>
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
                    }}> {name} </Text>
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
    triangle: {
        width: 40,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red'
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

export default ListActions;