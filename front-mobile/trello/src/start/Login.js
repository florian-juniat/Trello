import React, {useState} from 'react';
import {Keyboard, View, StyleSheet, Text, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors'
import Input from '../../components/Input'

import { Icon } from 'react-native-elements' 

import Visibility from '../../images/start/visibility2.png'
import VisibilityOff from '../../images/start/visibility_off2.png'

import axios from "axios";

const Login = props => {

    const [password, setPassword] = useState('')
    const [displayPassword, setDisplayPassword] = useState(false)

    const [VisibilityDisplay, setVisibilityDisplay] = useState(VisibilityOff)

    const [hidePassword, setHidePassword] = useState('')

    const back = () => {
        Keyboard.dismiss()
        props.setPage("intro")
    }
    
    const handleEmail = text => {
        setEmail(text)
    }

    const [email, setEmail] = useState("")

    const checkEmail = () => {
        if (email.length == 0) {
            return
        }
        if (!email.includes("@")) {
            return
        }
    }

    var information = <View style={style.next}>
        <TouchableOpacity style={
            style.disableButton
        } onPress={checkEmail} disabled={true} >
            <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Suivant</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={back} style={style.buttonBack}>
            <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
        </TouchableOpacity>
        </View>

    if (displayPassword == false && email.includes("@") && (email.includes(".com") || email.includes(".fr") || email.includes(".eu"))) {
        console.log("ceci est un test")
        information = <View style={style.next}>
            <Text></Text>
            <TouchableOpacity onPress={() =>
                setDisplayPassword(true)} style={
                style.button
            }  >
                <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Suivant</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={back} style={style.buttonBack}>
                <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
            </TouchableOpacity>
        </View>
    }

    if (displayPassword == true && password.length == 0) {
        information = <View style={{
            flex: 1,
            width: "100%",
            marginTop: 30
        }}>
                <Text style={style.text}>
                    Password
                </Text>
                <View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
                    <Input secureTextEntry={VisibilityDisplay == VisibilityOff ? true : false}  style={{...style.input, flex: 7}} placeholder="Mot de passe"  onChangeText={text => {
                        setPassword(text)
                    }} value={password} />
                    <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
                        if (VisibilityDisplay == VisibilityOff) {
                            setVisibilityDisplay(Visibility)
                        } else {
                            setVisibilityDisplay(VisibilityOff)
                        }
                    }}>
                        <Image style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'contain' 
                        }} source={VisibilityDisplay} />
                    </TouchableWithoutFeedback>
                </View>
            <View style={{...style.next, marginTop: 20}}>
                <TouchableOpacity onPress={() => setDisplayPassword(true)} style={{
                    ...style.disableButton, width: 150
                }} onPress={checkEmail} disabled={true}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={back} style={style.buttonBack}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    const handleConnect = () => {
        axios.post("http://" + props.ip + ":8080/auth/login", {
            email: email,
            password: password,
        }).then(function(res) {
            if (res.status == 200) {
                props.setToken(res.data.token)
                props.setPage("home")
            } else {
                console.log("probleme")
            }
        })
    }

    if (displayPassword == true && password.length != 0) {
        information = <View style={{
            flex: 1,
            width: "100%",
            marginTop: 30
        }}>
            <Text style={style.text}>
                Password
            </Text>
            <View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
                <Input secureTextEntry={VisibilityDisplay == VisibilityOff ? true : false} 
                style={{...style.input, flex: 7}} placeholder="Mot de passe"  onChangeText={text => {
                    setPassword(text)
                }} value={password} />
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
                    if (VisibilityDisplay == VisibilityOff) {
                        setVisibilityDisplay(Visibility)
                    } else {
                        setVisibilityDisplay(VisibilityOff)
                    }
                }}>
                    <Image style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain' 
                    }} source={VisibilityDisplay} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{...style.next, marginTop: 20}}>
                <TouchableOpacity onPress={handleConnect} style={{
                    ...style.button, width: 150
                }} >
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={back} style={style.buttonBack}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    var [loading, setLoading] = useState(<Text></Text>)


   

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.container}>
                <Text style={style.text}>
                    E-mail
                </Text>
                <Input style={style.input} placeholder="flo@gmail.com"  onChangeText={text => handleEmail(text)} value={email} />
                {information}
                {loading}
            </View>
        </TouchableWithoutFeedback>
    )
};

const style = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 30,
        backgroundColor: Colors.blueTrello,
        flex: 1,
        width: "100%",
    },
    text : {
        color: "white",
        fontWeight: "bold"
    },
    next: {
        flexDirection: "row-reverse",
        marginTop: 10,
    },
    button: {
        width: 100,
        borderRadius: 10,
        backgroundColor: Colors.greenTrello,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        elevation: 3,
    },
    input: {
        color: "white"
    },
    buttonBack: {
        width: 100,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    disableButton: {
        width: 100,
        borderRadius: 10,
        backgroundColor: Colors.greenTrello,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        elevation: 3,
        opacity: 0.3
    }
});

export default Login;