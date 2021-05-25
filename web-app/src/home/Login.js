import Avatar from '@material-ui/core/Avatar';
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export default class Login extends Component {
    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <CalendarIcon/>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    EpiTrello
                  </Typography>
                  <div><br/><br/><br/></div>
                  <form className={classes.form} noValidate>
                    <div className={classes.text}>E-mail</div>
                    <TextField InputProps={{className:classes.input}}
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <div><br/><br/></div>
                    <div className={classes.text}>Password</div>
                    <TextField InputProps={{className:classes.input}}
                      variant="standard"
                      //margin="right"
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      variant="text"
                      color="blue"
                      className={classes.button}
                      onClick={() => {this.props.changePage(0)}}                >
                      Annuler
                    </Button>
                    <Button
                      
                      variant="contained"
                      //color="blue"
                      className={classes.submit}
                      onClick={() => {this.props.authenticate(document.getElementById('email').value, document.getElementById('password').value, "test")}}>
                      Se connecter
                    </Button>
                  </form>
                </div>
                <Box mt={8}>
                  {this.props.Copyright(classes)}
                </Box>
              </Container>
              </ThemeProvider>
          );
    }
}