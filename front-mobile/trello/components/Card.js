import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 6.11,
        elevation: 14,
        borderRadius: 10
    }
});

export default Card;