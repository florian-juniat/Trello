import React, {useContext, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Start from './src/start/Start'
import Register from './src/start/Register'
import Login from './src/start/Login'
import Home from './src/home/Home'

import Board from './src/boards/Board'
import Card from './src/boards/Card'

import Ip from './src/start/Ip'

import axios from "axios";

export default function App() {

  const [page, setPage] = useState("ip")
  const [keyBoard, setKeyBoard] = useState("")
  const [ip, setIp] = useState("")
  const [token, setToken] = useState("")

  const [infoCard, setInfoCard] = useState(null)

  var display = <Start setPage={setPage}/>

  if (page == "ip") {
    display = <Ip setIp={setIp} setPage={setPage} />
  }
  if (page == "intro" && ip.length > 0) {
    display = <Start setPage={setPage}/>
  }
  if (page == "register" && ip.length > 0) {
    display = <Register ip={ip} setPage={setPage}/>
  }
  if (page == "login" && ip.length > 0) {
    display = <Login ip={ip} setPage={setPage} setToken={setToken}/>
  }
  if (page == "home" && token.length > 0 && ip.length > 0) {
    display = <Home ip={ip} token={token} setKeyBoard={setKeyBoard} setPage={setPage} />
  }
  if (page == "board" && token.length > 0 && ip.length > 0) {
    display = <Board ip={ip} token={token} setInfoCard={setInfoCard} keyBoard={keyBoard} setPage={setPage}/>
  }
  if (page == "card" && token.length > 0 && ip.length > 0) {
    display = <Card ip={ip} token={token} infoCard={infoCard} keyBoard={keyBoard} setPage={setPage}/>
  }

  return (
    <View style={styles.container}>
      {display}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
