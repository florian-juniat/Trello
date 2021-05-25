import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase} from 'react-native';

import Colors from '../../constants/Colors'

import Input from '../../components/Input'

const Ip = props => {

    const [ip, setIp] = useState("")

    const handleValidate = () => {
        props.setIp(ip)
        props.setPage("intro")
    }

    return (
        <View style={style.container}>
            <Text>Rentrez l'ip du serveur</Text>
            <Input style={style.input} value={ip}
                onChangeText={text => setIp(text)} />
            <TouchableOpacity onPress={handleValidate}
             style={style.button} disabled={ip.length > 0 ? false : true}>
                <Text style={{...style.textButton, opacity: ip.length > 0 ? 1: 0.5}}>Valider</Text> 
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        borderColor: "black",
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: 250,
    },
    button : {
        backgroundColor: Colors.grayTrello,
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 30

    },
    textButton: {
        color: "white",
    }
});

export default Ip;