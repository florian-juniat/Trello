import React, {useRef, useState} from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from "react-native";

import Colors from '../constants/Colors'

const Draggable = props => { {

    const pan = useRef(new Animated.ValueXY()).current;

    const [vis, setVis] = useState(true)
    const [long_press_timeout, setT] = useState(0)

    const [moveOn, setMoveOn] = useState(false)


    var panResponder = useRef(
        PanResponder.create({

            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                x: pan.x._value,
                y: pan.y._value
                });
                setTimeout(function(){
                }, 2000)

            },
            onPanResponderMove: (e, gestureState) => {
                setVis(false)
                props.handleMoveCard(props.value.id, e.nativeEvent.pageX, e.nativeEvent.pageY, props.value.tab, props.value)
                Animated.event([null, { dx: pan.x, dy: pan.y }]) (e, gestureState);
            },
            onPanResponderRelease: (e, gestureState) => {
                //moveOn = false
                props.handleReleaseCard(props.value.id, e.nativeEvent.pageX, e.nativeEvent.pageY, props.value.tab)
                props.setCard(null)
                setVis(true)
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                    }).start();
                pan.flattenOffset();
                setPanR(panResponderNot)
            }
        })
      ).current;

      var test = false

      var panResponderNot = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => false,
        })
      ).current;

    const [panR, setPanR] = useState(panResponderNot)

    const clickInfoCard = () => {
        props.setInfoCard(props.value)
        props.setPage("card")
    }
      
    return (
        <Animated.View 
            style={{...styles.container, opacity : vis === true ?  1 : 0,
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }}
            {...panR.panHandlers}
        >
            <TouchableWithoutFeedback onPress={clickInfoCard} onLongPress={() => {
                setPanR(panResponder)
                }}>
                <View style={styles.body}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        {props.value.labels.map(item => 
                            <Text style={{
                                backgroundColor: Colors.labels[parseInt(item) - 1],
                                width: 30,
                                height: 20,
                                marginLeft: 10
                            }}></Text>)}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text>
                            {props.value.title}
                        </Text>
                    </View>
                    <View style={styles.membs}>
                        {props.value.memb_id.map(item => <Text style={styles.bubbles}>{item.name.toUpperCase()[0]}</Text>)}
                    </View>
                </View>
            </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        backgroundColor: "white",
        width: 250,
        height: 150,
        justifyContent:"center",
        alignItems: "center",
        elevation: 20,
        overflow: "visible",
        borderRadius: 10
    },
    body: {
        flex: 1,
        width: "100%",
        margin: 10
    },
    titleContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    }, 
    membs: {
        flex: 1,
        width: "100%",
        flexDirection: "row-reverse",
        paddingLeft: 10
    },
    bubbles: {
        backgroundColor: "gray",
        padding: 2,
        borderRadius: 20,
        width: 30,
        height: 30,
        textAlign: "center",
        color: "white",
        margin: 1
    }
});

export default Draggable;