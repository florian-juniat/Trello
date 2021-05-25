
import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView, Image, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors'

import firstImage from '../../images/start/first_carrousel.png'
import secondImage from '../../images/start/second_carrousel.png'
import thirdImage from '../../images/start/third_carrousel.png'
import fourImage from '../../images/start/four_carrousel.png'

const template = props => {

    const screenWidth = Math.round(Dimensions.get('window').width);

    const [bullets, setBullets] = useState([
        <Text
            key={0}
            style={{...style.oneBullet,
                opacity: 0.8
            }}
            >
            &bull;
        </Text>,
        <Text
            key={1}
            style={{...style.oneBullet,
                opacity: 0.1
            }}
            >
            &bull;
        </Text>,
        <Text
            key={2}
            style={{...style.oneBullet,
                opacity: 0.1
            }}
            >
            &bull;
        </Text>,
        <Text
            key={3}
            style={{...style.oneBullet,
                opacity: 0.1
            }}
            >
            &bull;
        </Text>
    ])

    const getInterval = x => {
        var intvalue = Math.floor( x / screenWidth);
        let bullets2 = [];
        for (let i = 0; i < 4; i++) {
            bullets2.push(
                <Text
                key={i}
                style={{
                    ...style.oneBullet,
                    opacity: intvalue === i ? 0.8 : 0.5,
                    color: intvalue === i ? "white" : "black",
                }}
                >
                &bull;
                </Text>
        );
        }
        setBullets(bullets2)
    }


    const register = () => {
        props.setPage("register")
    }
    const login = () => {
        props.setPage("login")
    }


    return (
        <View style={style.container}>

            <View style={{
                flex: 6,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <ScrollView
                onScroll={data => {
                    getInterval(data.nativeEvent.contentOffset.x);
                }}
                horizontal={true}
                contentContainerStyle={{ width: `${100 * 4}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                >
                    <View style={style.components}>
                        <Text style={{
                            color: "white",
                            fontSize: 23,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Bonjour iTrello !</Text>
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            marginBottom: 40
                        }}>On s'y met ?</Text>
                        <Image style={{
                            width: 250,
                            height: 200,
                            resizeMode: 'contain' 
                        }} source={firstImage} />
                    </View>

                    <View style={style.components}>
                        <Image style={{
                            width: 300,
                            height: 200,
                            marginBottom: 40,
                            resizeMode: 'contain' 
                        }} source={secondImage} />
                        <Text style={{
                            color: "white",
                            fontSize: 23,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>S'organiser</Text>
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            paddingHorizontal: 80,
                            textAlign: "center"
                        }}>Créer un tableau iTrello pour organiser quoi que ce soit avec qui que ce soit</Text>
                        
                    </View>

                    <View style={style.components}>
                    
                        <Image style={{
                            width: 300,
                            height: 200,
                            resizeMode: 'contain',
                            marginBottom: 40
                        }} source={thirdImage} />
                        <Text style={{
                            color: "white",
                            fontSize: 23,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Ajouter des détails</Text>
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            paddingHorizontal: 80,
                            textAlign: "center"
                        }}>Oouvrez les cartes pour y ajouter des images, des checklists, des étiquettes et davantage</Text>
                        
                    </View>

                    <View style={style.components}>
                    
                        <Image style={{
                            width: 300,
                            height: 250,
                            resizeMode: 'contain',
                            marginBottom: 40
                        }} source={fourImage} />
                        <Text style={{
                            color: "white",
                            fontSize: 23,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>Faites équipe</Text>
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            paddingHorizontal: 80,
                            textAlign: "center"
                        }}>Invitez d'autres personnes à rejoindre votre tableau gratuitement</Text>
                        
                    </View>
                    
                    
                </ScrollView>
                <View style={style.bullet}>
                    {bullets}
                </View>
            </View>

            <View style={{
                flex: 2,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center"
                }}>

                <View style={style.buttonsContainer}>
                    <TouchableOpacity style={style.button} onPress={register}>
                        <Text style={{color: "white"}}> S'enregistrer </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={login}>
                        <Text style={{color: "white"}}> Se connecter </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    paddingHorizontal: 20,
                    textAlign: "center"}}
                    >
                    En créant un compte, vous acceptez nos Conditions de Service et notre Politique de Confidentialité.
                </Text>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blueTrello,
    },
    text: {
        color: 'white'
    },
    components : {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        textAlign: "center"
    },
    bullet : {
        color: "white",
        flexDirection: "row",
    },
    oneBullet: {
        color: "white",
        marginHorizontal: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonsContainer : {
        flexDirection: "row",
    },
    button: {
        marginHorizontal: 20,
        marginBottom: 20,
        width: 150,
        borderRadius: 10,
        backgroundColor: Colors.greenTrello,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        elevation: 3,
    }
});

export default template;