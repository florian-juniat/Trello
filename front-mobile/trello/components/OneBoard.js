import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import Colors from '../constants/Colors'
import OneImage from '../images/paysage/1.jpg'
import TwoImage from '../images/paysage/2.jpg'
import ThreeImage from '../images/paysage/3.jpg'
import FourImage from '../images/paysage/4.jpg'
import FiveImage from '../images/paysage/5.jpg'
import SixImage from '../images/paysage/6.jpg'
import SevenImage from '../images/paysage/7.jpg'
import HeightImage from '../images/paysage/8.jpg'
import NineImage from '../images/paysage/9.jpg'
import TenImage from '../images/paysage/10.jpg'

const OneBoard = props => {

    var ImageDisplay = OneImage
    if (props.value.image == 2) {
        ImageDisplay = TwoImage
    }
    if (props.value.image == 3) {
        ImageDisplay = ThreeImage
    }
    if (props.value.image == 4) {
        ImageDisplay = FourImage
    }
    if (props.value.image == 5) {
        ImageDisplay = FiveImage
    }
    if (props.value.image == 6) {
        ImageDisplay = SixImage
    }
    if (props.value.image == 7) {
        ImageDisplay = SevenImage
    }
    if (props.value.image == 8) {
        ImageDisplay = HeightImage
    }
    if (props.value.image == 9) {
        ImageDisplay = NineImage
    }
    if (props.value.image == 10) {
        ImageDisplay = TenImage
    }

    const handleclick = () => {
        props.setKeyBoard(props.value.key)
        props.setPage("board")
    }


    return (
        <TouchableOpacity style={{...props.style, ...style.container}} onPress={handleclick} >
            <Image style={style.image} source={ImageDisplay} />
            <Text> {props.value.name} </Text>
        </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 6.11,
        elevation: 5,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    image : {
        width: 50,
        height : 50,
    }
});

export default OneBoard;