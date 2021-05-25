import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import axios from "axios";
import theme from './theme';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import { styles } from './theme/styles';
import Welcome from './home/Welcome';
import Login from './home/Login';
import Register from './home/Register';
import BoardsMenu from './home/BoardsMenu';

class App extends Component {
  constructor(props) {
      super(props);
      this.changePage = this.changePage.bind(this);
      this.authenticate = this.authenticate.bind(this);
      this.register = this.register.bind(this);
      this.state = {
        data:[],
        charged: 0,
        page: 0,
        email: ""
      }
  }
  Copyright(classes) {
    return (
      <Typography className={classes.copyright} align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          EpiTrello
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  ////// home // Login
  authenticate(email, password, name) {
    console.log("clicked button");
    axios.post("http://127.0.0.1:8080/auth/login", {
      email: email,
      password: password
    }).then((res) => {
      sessionStorage.setItem('token', res.data.token)
      this.setState({charged:  1});
    }).catch(error => {
      alert(error);
    })
  }
  ////// home // Welcome
  changePage(n) {
    this.setState({page: n});
  }
  ////// home // Register
  register(email, password, name) {
    axios.post("http://127.0.0.1:8080/auth/register", {
      email: email,
      password: password,
      name: name
    }).then((res) => {
        this.setState({charged:  1});
    })
  }
  render() {
    const {classes} = this.props;
    if (this.state.charged == 1 || sessionStorage.getItem('token') != undefined) {
      return (
        <ThemeProvider theme={theme} classes={classes}>
          <BoardsMenu
            classes = {classes}
          />
        </ThemeProvider>
      );
    }
    else if (this.state.charged == 0) {
      if (this.state.page == 0)
        return (
          <Welcome
            changePage = {this.changePage}
            classes = {classes}
          />
        )
      if (this.state.page == 1)
        return (
          <Login 
            classes = {classes}
            changePage = {this.changePage}
            authenticate = {this.authenticate}
            Copyright = {this.Copyright}
          />
        )
      if (this.state.page == 2)
        return (
          <Register
            classes = {classes}
            changePage = {this.changePage}
            register = {this.register}
            Copyright = {this.Copyright}
          />
        );
    };
  };
};

App.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);