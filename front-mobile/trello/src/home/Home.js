import React, {useState} from 'react';
import {View, StyleSheet, Text, DrawerLayoutAndroid, Component, FlatList, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import HomeBar from '../../components/HomeBar'
import OneBoard from '../../components/OneBoard'

import AddCard from './AddCard'

import axios from "axios";

const Home = props => {

    const [boards, setBoards] = useState([
    ])

    const [getInfo, setGetInfo] = useState(false)

    if (getInfo == false) {
        setGetInfo(true)
        axios.get("http://" + props.ip + ":8080/home/",{ headers: { Authorization: props.token } }
         ).then(res => {

            if (res.status == 200) {

                var newBoard = []
                for (var i = 0; i < res.data.length; i++) {
                    newBoard.push({
                        key: res.data[i].id.toString(),
                        name: res.data[i].name,
                        member_id: res.data[i].memb_id,
                        image: res.data[i].picture
                    })
                }
                setBoards(newBoard)
                console.log(newBoard)
            } else {
                console.log('problem')
            }
         })
    }

    const [page, setPage] = useState("home")


    var display = <FlatList
            style={{width: "100%", paddingHorizontal: "15%", 
            marginTop: 50}}
            showsVerticalScrollIndicator={false}
            data={boards} 
            renderItem={itemData =>
            <OneBoard setKeyBoard={props.setKeyBoard} setPage={props.setPage} value={itemData.item} />
            }>
        </FlatList>

    if (page == "addCard") {
        display = <AddCard setGetInfo={setGetInfo} ip={props.ip} token={props.token} setPage={setPage}/>
    }

    if (page == "myCard") {
        display = <Text>Autres</Text>
    }



    return (
        <KeyboardAvoidingView style={style.container}>
            <HomeBar setPage={setPage} style={{flex: 1, width: "100%"}} />
            <View style={style.home}>
                {display}
            </View>
            
        </KeyboardAvoidingView>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },
    home: {
        flex: 11,
        alignItems: "center",
        width: "100%",
        justifyContent:"center",
        
    }
});

export default Home;