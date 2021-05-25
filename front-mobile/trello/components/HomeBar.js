import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors'

import Mascot from '../images/start/first_carrousel.png'

const HomeBar = props => {
    return (
        <View style={{...style.container, ...props.style}}>
            <TouchableOpacity style={style.cote} onPress={() => props.setPage("myCard")}>
                <Text style={style.text}>Autres</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.cote} onPress={() => props.setPage("home")}>
                <Image style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'contain' 
                }} source={Mascot} />
            </TouchableOpacity>
            <TouchableOpacity style={style.cote} onPress={() => props.setPage("addCard")}>
                <Text style={style.text}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        backgroundColor: Colors.blueTrello,
        paddingTop: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    title : {

    },
    text: {
        color: "white",
        fontWeight: "bold"
    },
    cote: {
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default HomeBar;