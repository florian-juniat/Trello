import React, {useState, useRef} from 'react';
import { Dimensions,FlatList ,View, StyleSheet, Text, Button, Animated,ImageBackground, ScrollView, TouchableOpacity, PanResponder, RefreshControl} from 'react-native';

import OneImage from '../../images/paysage/1.jpg'
import TwoImage from '../../images/paysage/2.jpg'
import ThreeImage from '../../images/paysage/3.jpg'
import FourImage from '../../images/paysage/4.jpg'
import FiveImage from '../../images/paysage/5.jpg'
import SixImage from '../../images/paysage/6.jpg'
import SevenImage from '../../images/paysage/7.jpg'
import HeightImage from '../../images/paysage/8.jpg'
import NineImage from '../../images/paysage/9.jpg'
import TenImage from '../../images/paysage/10.jpg'

import Colors from '../../constants/Colors'

import Draggable from '../../components/Draggable'
import Carousel from 'react-native-snap-carousel';

import ListActions from '../../components/ListActions'

import AddList from '../../components/AddList'


import axios from "axios";


function getBackground(numImage) {
    if (numImage == "1") {
        return OneImage
    }
    if (numImage == "2") {
        return TwoImage
    }
    if (numImage == "3") {
        return ThreeImage
    }
    if (numImage == "4") {
        return FourImage
    }
    if (numImage == "5") {
        return FiveImage
    }
    if (numImage == "6") {
        return SixImage
    }
    if (numImage == "7") {
        return SevenImage
    }
    if (numImage == "8") {
        return HeightImage
    }
    if (numImage == "9") {
        return NineImage
    }
    if (numImage == "10") {
        return TenImage
    }
}

const DupliCard = props => {
    return (
        <View style={{
            backgroundColor: "white",
            width: 250,
            height: 150,
            justifyContent:"center",
            alignItems: "center",
            elevation: 20,
            opacity: 1,
            overflow: "visible",
            position: "absolute",
            left: props.x - 120,
            top: props.y - 190,
            borderRadius: 10,
            transform: [{ rotate: "10deg" }] 
        }}>
            <View style={{
                flex: 1,
                width: "100%",
                margin: 10
            }}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    {props.value.labels.map(item => 
                        <Text style={{
                            backgroundColor: Colors.labels[parseInt(item) - 1],
                            width: 30,
                            height: 20,
                            marginLeft: 10
                        }}></Text>)}
                </View>
                <View style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>
                        {props.value.title}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "row-reverse",
                    paddingLeft: 10
                }}>
                    {props.value.memb_id.map(item => <Text style={{
                            backgroundColor: "gray",
                            padding: 2,
                            borderRadius: 20,
                            width: 30,
                            height: 30,
                            textAlign: "center",
                            color: "white",
                            margin: 1
                        }}>{item.name.toUpperCase()[0]}</Text>)}
                </View>
            </View>
        </View>
    )
}


const Board = props => {

    const [fond, setFond] = useState(getBackground("1"))

    let moveX = 0
    const [scroller, setScroller] = useState(null)
    const [card, setCard] = useState(null)

    const handleMoveCard = (id, x, y, tab,value) => {

        setCard(<DupliCard x={x} y={y} value={value}/>)
        if (x > 370 && scroller != null) {
            moveX = moveX + 30
            scroller.scrollTo({x: moveX, y: 0})
        }
        if (x < 50 && scroller != null && moveX > 0) {
            moveX = moveX - 30
            scroller.scrollTo({x: moveX, y: 0})
        }
    }

    const handleReleaseCard = (id, x, y, tab) => {

        var n = parseInt((x + moveX + 10) / (20 + screenWidth / 100 * 70))
        var checkMove = parseInt((x + moveX + 10) - n * (20 + screenWidth / 100 * 70))

        if (n >= info.length) {
            n = info.length - 1
        }

        axios.put("http://" + props.ip + ":8080/board/" + board.id.toString() + "/move-card", {
                id: id,
                newlist: board.list[n]
            }, {headers: { Authorization: props.token } }).then(function(res) {
                if (res.status == 200) {
                    console.log("its move")
                    refreshPage()
                }
        })
    }

    const handleReleaseCard2 = (id, x, y, tab) => {

        var n = parseInt((x + moveX + 10) / (20 + screenWidth / 100 * 70))
        var checkMove = parseInt((x + moveX + 10) - n * (20 + screenWidth / 100 * 70))

        if (n >= info.length) {
            n = info.length - 1
        }

        if (checkMove > 50 && checkMove < screenWidth / 100 * 70 - 50 && n != tab) {
 

            console.log("It move : ", n)

            var newInfo = []
            
            var theCard = info[tab].card.filter(item => item.id === id)

            if (theCard.length == 0) {
                return
            }
            for (var i = 0; i < info.length; i++) {
                var newCards = []
                for (var j = 0; j < info[i].card.length; j++) {
                    if (info[i].card[j].id != id) {
                        newCards.push({
                            key: (parseInt(info[i].card[j].key) * (-1)).toString(),
                            title: info[i].card[j].title,
                            tab: info[i].card[j].tab,
                            id: info[i].card[j].id,
                            description: info[i].card[j].description,
                            memb_id: info[i].card[j].memb_id,
                            labels: info[i].card[j].labels
                        })
                    }
                }
                if (i === n) {
                    newCards.push({
                        key: theCard[0].key,
                        title: theCard[0].title,
                        tab: n,
                        id : theCard[0].id,
                        description: theCard[0].description,
                        memb_id: theCard[0].memb_id,
                        labels: theCard[0].labels
                    })
                }
                var element = {
                    key: info[i].key,
                    card: newCards,
                    title: info[i].title
                }
                newInfo.push(element)
            }

            setInfo(newInfo)
            setUpdateInfo(updateInfo => updateInfo ? false : true)
        }

    }
  
    const [makeRequest, setMakeRequest] = useState(false)


    const [updateInfo, setUpdateInfo] = useState(false)
    const [info, setInfo] = useState([])
    const [board, setBoard] = useState({
        id: 1,
        name: "",
        memb_id: [],
        list: [],
        card_id: [],
        picture: 2,
        cards: [],
        labels: []
    })

    if (!makeRequest) {
        setMakeRequest(true)

        axios.get("http://" + props.ip + ":8080/board/" + props.keyBoard,{ headers: { Authorization: props.token } }
         ).then(response => {

            if (response.status == 200) {
                console.log("===========")
                console.log("===========\n")

                console.log(response)
                console.log("\n===========")

                console.log("===========")



                var res = response.data/*{ board: {
                    id: 1,
                    name: "board1",
                    memb_id: [
                        {id: 1, name: "flo"},
                        {id: 2, name: "nastia"}
                    ],
                    list: [
                        "list1",
                        "list2",
                        "list3"
                    ],
                    card_id: [1, 2],
                    picture: 2,
                    labels: [
                        ["1", "labels1"], ["2", "labels2"], ["3", ""], ["4", ""], ["5", ""], ["6", ""]
                    ]
                },
                cards: [
                    {
                        id: 2,
                        name: "card1",
                        memb_id: [{id: 1, name:"flo"}, {id: 2, name: "nastia"}],
                        list: "list1",
                        description: "Ceci est une decription",
                        labels: [1, 2]
                    },
                    {
                        id: 1,
                        name: "Second card",
                        memb_id: [{id: 1, name:"flo"}],
                        list: "list2",
                        description: "Autre type de decription",
                        labels: [2]
                    }
                ],
                }*/

                setBoard(res.board)
                setFond(getBackground(res.board.picture.toString()))

                var newInfo = []

                if (res.board.list) {
                    for (var i = 0; i < res.board.list.length; i++) {

                        var newCards = []

                        if (res.cards) {
                            for (var j = 0; j < res.cards.length; j++) {
                                if (res.board.list[i] === res.cards[j].list) {
                                    newCards.push({
                                        key: res.cards[j].id.toString(),
                                        title: res.cards[j].name,
                                        tab: i,
                                        id: res.cards[j].id,
                                        description: res.cards[j].description,
                                        memb_id: res.cards[j].memb_id ? res.cards[j].memb_id.map(item => {
                                            var t = res.board.memb_id.filter(element => element.id === item)
                                            if (t.length > 0) {
                                                return t[0]
                                            }
                                            return {id: 0, name: ""}
                                        }) : [],
                                        labels: res.cards[j].labels ? res.cards[j].labels.map(item => item.toString()) : []
                                    })
                                }
                            }
                        }

                        var element = {
                            title: res.board.list[i],
                            key: i.toString(),
                            card: newCards
                        }
                        newInfo.push(element)
                    }
                }
                setInfo(newInfo)
            }
        })
    
    }

    const [reload, setReload] = useState(false)

    const reloadAll = () => {
        if (reload == false) {
            var newInfo = []
            for (var i = 0; i < info.length; i++) {
                var newCards = []
                for (var j = 0; j < info[i].card.length; j++) {
                    newCards.push({
                        key: (parseInt(info[i].card[j].key) * (-1)).toString(),
                        title: info[i].card[j].title,
                        tab: info[i].card[j].tab,
                        id: info[i].card[j].id,
                        description: info[i].card[j].description,
                        memb_id: res.cards[j].memb_id ? res.cards[j].memb_id.map(item => {
                            var t = res.board.memb_id.filter(element => element.id === item)
                            if (t.length > 0) {
                                return t[0]
                            }
                            return {id: 0, name: ""}
                        }) : [],
                        labels: info[i].card[j].labels
                    })
                }
                var element = {
                    title: info[i].title,
                    key: info[i].key,
                    card: newCards,
                }
                newInfo.push(element)
            }
            setInfo(newInfo)
            setReload(true)
        }
    }




    const refreshPage = () => {
        axios.get("http://" + props.ip + ":8080/board/" + props.keyBoard,{ headers: { Authorization: props.token } }
         ).then(response => {

            if (response.status == 200) {

                var res = response.data

                setBoard(res.board)
                setFond(getBackground(res.board.picture.toString()))

                var newInfo = []

                if (res.board.list) {
                    for (var i = 0; i < res.board.list.length; i++) {

                        var newCards = []

                        if (res.cards) {
                            for (var j = 0; j < res.cards.length; j++) {
                                if (res.board.list[i] === res.cards[j].list) {
                                    newCards.push({
                                        key: res.cards[j].id.toString(),
                                        title: res.cards[j].name,
                                        tab: i,
                                        id: res.cards[j].id,
                                        description: res.cards[j].description,
                                        memb_id: res.cards[j].memb_id ? res.cards[j].memb_id.map(item => {
                                            var t = res.board.memb_id.filter(element => element.id === item)
                                            if (t.length > 0) {
                                                return t[0]
                                            }
                                            return {id: 0, name: ""}
                                        }) : [],
                                        labels: res.cards[j].labels ? res.cards[j].labels.map(item => item.toString()) : []
                                    })
                                }
                            }
                        }

                        var element = {
                            title: res.board.list[i],
                            key: i.toString(),
                            card: newCards
                        }
                        newInfo.push(element)
                    }
                }
                setInfo(newInfo)
            }
        })
    }





    const changeMoveX = x => {
        //moveX = x
    }

    const [listAct, setListAct] = useState(null)
    const [addList, setAddList] = useState(null)
    const [modifyBoard, setModifyBoard] = useState(false)

    const closeListActions = () => {
        setListAct(null)
        setModifyBoard(false)
    }

    const closeAddList = () => {
        setAddList(null)
        setModifyBoard(false)
    }

    const screenWidth = Math.round(Dimensions.get('window').width);

    const sortBy = (id, type) => {
        var newInfo = []
            for (var i = 0; i < info.length; i++) {
                var newCards = []
                for (var j = 0; j < info[i].card.length; j++) {
                    newCards.push({
                        key: (parseInt(info[i].card[j].key) * (-1)).toString(),
                        title: info[i].card[j].title,
                        tab: info[i].card[j].tab,
                        id: info[i].card[j].id,
                        description: info[i].card[j].description,
                        memb_id: info[i].card[j].memb_id,
                        labels: info[i].card[j].labels
                    })
                }
                var element = {
                    title: info[i].title,
                    key: info[i].key,
                    card: newCards,
                }
                if (element.key === id) {
                    if (type === "alpha") {
                        element.card.sort(function(a, b) {
                            if (a.title > b.title) {
                                return (1)
                            } else {
                                return (-1)
                            }
                        })
                    }
                    if (type === "nbPerson") {
                        element.card.sort(function(a, b) {
                            if (a.memb_id.length < b.memb_id.length) {
                                return (1)
                            } else {
                                return (-1)
                            }
                        })
                    }
                }
                newInfo.push(element)
            }
            setInfo(newInfo)
    }


    return (
        <ImageBackground style={style.container} source={fond}>
           
            <View style={style.bar}>
                <TouchableOpacity onPress={() => props.setPage("home")}>
                    <Text style={style.title}> &larr;</Text>
                </TouchableOpacity>
                <Text style={style.title}>{board.name}</Text>
                <TouchableOpacity onPress={() => {
                    setModifyBoard(true)
                    setAddList(<AddList
                    close={closeAddList}
                    labels={board.labels}
                    token={props.token}
                    ip={props.ip}
                    id={board.id}
                    refreshPage={refreshPage}
                    top={200}/>)
                }}>
                    <Text style={style.title}> ... </Text>
                </TouchableOpacity>
            </View>

            <View style={{...style.scrollview,
            opacity: modifyBoard === false ? 1 : 0.4,
            }} needsOffscreenAlphaCompositing
={true}>
                {card}
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ width: `${70 * info.length}%` }}
                scrollEventThrottle={200}
                decelerationRate="fast"
                ref={(scroller2) => {
                    setScroller(scroller2)
                    reloadAll()
                }}
                onScroll={data => {
                    changeMoveX(data.nativeEvent.contentOffset.x);
                }}
                >
                    {info.map(itemM => 
                    
                    <View style={{
                        marginHorizontal: 10,
                        flex: 1,
                        backgroundColor: 'rgba(150, 150, 150, 0.6)',
                        alignItems: "center",
                        borderRadius: 10
                    }}>
                        <View style={style.titleList}>
                            <View style={{width: "33%"}}>
                            
                            </View>
                            <View style={{width: "33%", alignItems:"center"}}>
                                <Text style={{textAlign: "center" ,color: "white"}}>{itemM.title}</Text>
                            </View>
                            <View style={{width: "33%", alignItems:"center"}}>
                                <TouchableOpacity onPress={(evt) => {
                                    setModifyBoard(true)
                                    setListAct(<ListActions
                                         y={evt.nativeEvent.pageY} 
                                         x={evt.nativeEvent.pageX} 
                                         value={itemM} close={closeListActions} 
                                         top={200}
                                         token={props.token}
                                        ip={props.ip}
                                        id={board.id}
                                        refreshPage={refreshPage}
                                         sortBy={sortBy}/>)
                                }}>
                                    <Text style={style.title}> ... </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                        style={{marginTop: 20}}
                        >
                                {itemM.card.map(item => 
                                    <Draggable
                                    setInfoCard={props.setInfoCard}
                                    handleMoveCard={handleMoveCard} 
                                    handleReleaseCard={handleReleaseCard}
                                    value={{...item, labelsBoard: board.labels, memb_id_Board: board.memb_id, boardId: board.id}}
                                    key={item.key}
                                    setCard={setCard}
                                    info={info}
                                    setPage={props.setPage}
                                    />
                                    
                                )}
                        </ScrollView>
                    </View>
                    )}

                
                    
                </ScrollView>
                
            </View>
            <Text>{props.keyBoard}</Text>

            {listAct}
            {addList}
        </ImageBackground>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    titleList: {
        backgroundColor: Colors.grayTrello,
        color: "white",
        width: "100%",
        paddingVertical: 20,
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bar : {
        paddingHorizontal: 40,
        flexDirection: "row",
        paddingTop: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.grayTrello,
        borderRadius: 10
    },
    scrollview : {
        flex: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
});

export default Board;