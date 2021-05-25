import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Welcome extends Component {
    render() {
        const {classes} = this.props;
        return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Bienvenue sur EpiTrello!
              </Typography>
                <div className={classes.input}><br/><br/>On s'y met ?</div>
                <div><br/><br/><br/><br/><br/></div>
            <Button variant="text"
                  className={classes.submit}
                  onClick={() => {this.props.changePage(1)}}>
              Se connecter
            </Button>
            <Typography component="h1" variant="h5">
            <br/><br/>
                OU
              </Typography>
            <Button variant="text"
                  className={classes.button}
                  onClick={() => {this.props.changePage(2)}}>
              S'enregistrer
            </Button>
            </div>
          </Container>
          </ThemeProvider>
        );
    }
}