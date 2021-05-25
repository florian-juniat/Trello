import React, {useState} from 'react';
import {Keyboard, View, StyleSheet, Text, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors'
import Input from '../../components/Input'

import { Icon } from 'react-native-elements' 

import Visibility from '../../images/start/visibility2.png'
import VisibilityOff from '../../images/start/visibility_off2.png'

import axios from "axios";


const Register = props => {

    const [password, setPassword] = useState('')
    const [displayPassword, setDisplayPassword] = useState(false)

    const [name, setName] = useState("")

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




    const handleRegister = () => {
        axios.post("http://" + props.ip + ":8080/auth/register", {
            email: email,
            password: password,
            name: name
        }).then(function(res) {
            if (res.status == 200) {
                props.setPage("intro")
            } else {
                console.log("probleme")
            }
        })
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

    if (displayPassword == true && (password.length == 0 || name.length === 0)) {
        information = <View style={{
            flex: 1,
            width: "100%",
            marginTop: 30
        }}>
                <Text style={style.text}>
                    Mot de passe
                </Text>
                <View style={{flexDirection: "row", width: "100%", alignItems: "center", marginBottom: 20}}>
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
                <Text style={style.text}>Nom</Text>
                <Input style={style.input} placeholder="flo"  onChangeText={text => setName(text)} value={name} />
            <View style={{...style.next, marginTop: 20}}>
                <TouchableOpacity onPress={() => setDisplayPassword(true)} style={{
                    ...style.disableButton, width: 150
                }} onPress={checkEmail} disabled={true}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>S'enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={back} style={style.buttonBack}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    if (displayPassword == true && password.length != 0 && name.length != 0) {
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
            <Text style={style.text}>Nom</Text>
            <Input style={style.input} placeholder="flo"  onChangeText={text => setName(text)} value={name} />
            <View style={{...style.next, marginTop: 20}}>
                <TouchableOpacity onPress={handleRegister} style={{
                    ...style.button, width: 150
                }} >
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>S'enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={back} style={style.buttonBack}>
                    <Text style={{...style.text, fontSize: 17, marginHorizontal: 10}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.container}>
                <Text style={style.text}>
                    E-mail
                </Text>
                <Input style={style.input} placeholder="flo@gmail.com"  onChangeText={text => handleEmail(text)} value={email} />
                {information}
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

export default Register;