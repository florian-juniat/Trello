import React, {useState} from 'react';
import {Keyboard,  Dimensions, FlatList ,View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';

import Input from '../../components/Input'
import Colors from '../../constants/Colors'

import ImageUnamed from '../../images/utiles/unnamed.png'

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


import axios from "axios";

const TouchImage = props => {
    const screenWidth = Math.round(Dimensions.get('window').width);

    const screenHeight = Math.round(Dimensions.get('window').height);

    return (
        <TouchableOpacity onPress={() => props.changeImage(props.value.key)}>
            <Image source={props.value.image} style={{
                width: 200,
                height: 300,
            }}/>
        </TouchableOpacity>
    )
}



const AddCard = props => {

    var listImages = [
        {key: "1", image: OneImage}, {key: "2", image: TwoImage}, {key: "3", image: ThreeImage},
        {key: "4", image: FourImage}, {key: "5", image: FiveImage}, {key: "6", image: SixImage},
        {key: "7", image: SevenImage}, {key: "8", image: HeightImage}, {key: "9", image: NineImage},
        {key: "10", image: TenImage}]

    const [image, setImage] = useState(ImageUnamed)
    const [displayList, setDisplayList] = useState(false)
    const [imageNumber, setImageNumber] = useState("0")

    const changeImage = key => {
        setImageNumber(key)
        if (key == "1") {
            setImage(OneImage)
        }
        if (key == "2") {
            setImage(TwoImage)
        }
        if (key == "3") {
            setImage(ThreeImage)
        }
        if (key == "4") {
            setImage(FourImage)
        }
        if (key == "5") {
            setImage(FiveImage)
        }
        if (key == "6") {
            setImage(SixImage)
        }
        if (key == "7") {
            setImage(SevenImage)
        }
        if (key == "8") {
            setImage(HeightImage)
        }
        if (key == "9") {
            setImage(NineImage)
        }
        if (key == "10") {
            setImage(TenImage)
        }
        setDisplayList(false)
    }


    const [name, setName] = useState('')

    const handleAdd = () => {
        axios.post("http://" + props.ip + ":8080/home/add-board", {
            name: name,
            picture: parseInt(imageNumber)
        }, {headers: { Authorization: props.token } }).then(function(res) {
            if (res.status == 200) {
                props.setGetInfo(false)
                props.setPage("home")
            } else {
                console.log("probleme")
            }
        })
    }


    var AddButton = displayList === false ? <TouchableOpacity disabled={true} style={style.disableButton}>
        <Text style={{color: "white"}} disabled={true}> Ajouter </Text>
        
        </TouchableOpacity> : null
    
    if (name.length > 0 && image != ImageUnamed) {
        AddButton = displayList === false ? <View>

            <TouchableOpacity style={style.button} onPress={handleAdd} >
        <Text style={{color: "white"}}> Ajouter </Text>
        </TouchableOpacity>
        <Text></Text>
        </View> : null
    }

    var listImage = <TouchableOpacity onPress={() => setDisplayList(true)}>
        <Image source={image} style={style.image}/> 
        </TouchableOpacity>

    if (displayList == true) {
        listImage = <FlatList
        
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={listImages} 
        renderItem={itemData =>
        <TouchImage value={itemData.item} changeImage={changeImage} />
        }>
    </FlatList>
    }

    return (
        <View  style={{...style.container, 
    backgroundColor: displayList === true ? 'rgba(52, 52, 52, 0.8)' : 'white'}}>
            <Text style={style.title}>Créer un tableau</Text>
            <View style={style.containerName}>
                <Text>Nom tableau</Text>
                <Input style={style.input} onChangeText={text => {
                        setName(text)
                    }} value={name} />
            </View>
            {listImage}
            {AddButton}
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 40,
        opacity: 1,
    },
    absolute: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        marginHorizontal: 50,
        marginVertical: 100
    },
    image : {
        width: 150,
        height : 200,
    },
    containerName : {
        margin: 50,
        width: "100%",
        justifyContent: "center",
        alignItems:"center"
    },
    button: {
        marginTop: 50,
        marginHorizontal: 20,
        marginBottom: 20,
        width: 200,
        borderRadius: 10,
        backgroundColor: Colors.greenTrello,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        elevation: 3,
        marginBottom: 50
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",

    },
    input: {
        color: "black",
        borderBottomColor: 'black',
        width: 200
    },
    disableButton: {
        marginTop: 50,
        width: 200,
        borderRadius: 10,
        backgroundColor: Colors.greenTrello,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        elevation: 3,
        opacity: 0.3,
        marginBottom: 50
    }
});

export default AddCard;