import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import axios from "axios";
//import { chartjs } from './helpers';
//import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import PropTypes from 'prop-types';
// FROM CONNECTION.JS (file doesn't exist anymore lol)
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          charged: 0
        }
    }
    
    Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              EpiTrello
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    }

    authentificate(username, password) {
        //var jsonString = JSON.stringify({"username": email, "password": password});
        console.log("clicked button")
       // this.setState({charged: 1});
        axios({
          "method":"GET",
          "url":"http://137.74.46.208/v1/dashboard/user/login",
          "params":{
            "username": username,
            "password": password
          }
        })
        .then((response)=>{
          this.setState({charged: 1});
          console.log("Ya une réponse")
          sessionStorage.setItem('token', response.data)
          console.log(response.data)
        })
        .catch((error)=>{
          alert("Error when trying to login, please try again")
          console.log(error)
        })
    }

    render() {
        const {classes} = this.props;
        if (this.state.charged == 1 || sessionStorage.getItem('token') != undefined) {
          return (
          <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
              <Routes />
          </Router>
          </ThemeProvider>
          );
      }
        else if (this.state.charged == 0) {
            return (
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Connexion
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Adresse email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      //value={this.state.value}
                      //onChange={this.handleMail}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      //value={this.state.value}
                      //onChange={this.handlePassword}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Se rappeler de moi"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => this.authentificate(document.getElementById("email").value, document.getElementById("password").value)}
                    >
                      Connexion
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Mot de passe oublié ? Tant pis pour toi chacal.
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
                <Box mt={8}>
                  {this.Copyright()}
                </Box>
              </Container>
            );
        }
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);