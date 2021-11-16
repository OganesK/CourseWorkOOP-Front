import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { BASE_API_URL } from '../../config';
import Copyright from "./Copyright";
import useStyles from "./Style";

import backgroundImage from './background.jpg';

interface PropsTypes extends WithStyles<typeof useStyles>{ }

interface StateTypes {
    firstnameValue: string;
    lastnameValue: string;
    emailFormValue: string;
    passwordValue: string;
}

class SignUpPage extends React.Component<PropsTypes, StateTypes> {


    constructor(props: PropsTypes) {
        super(props);
    
        this.state = {
            firstnameValue: "",
            lastnameValue: "",
            emailFormValue: "",
            passwordValue: "",
        };
      }
    
    signUpMutation = `
      mutation($data:signUpInput){
        signUp(data:$data){
          token
        }
      }
    `

    render(){
        const signUpHandler: () => void = async () => {
            const response = await fetch(BASE_API_URL, {
              method: 'POST',
              redirect: 'manual',
              headers:{
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: this.signUpMutation,
                variables: {
                  data: {
                    firstname: this.state.firstnameValue,
                    lastname: this.state.lastnameValue,
                    email: this.state.emailFormValue,
                    password: this.state.passwordValue
                  }
                }
              })
            })
            const token = await response.json();
            window.localStorage.setItem('token', token.data.signUp.token)
        }

        const { classes } = this.props;
        return(
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} style={{backgroundImage: `url(${backgroundImage})`}}/>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} onSubmit={signUpHandler} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="Firstname"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                  className={classes.textField}
                  value={this.state.firstnameValue}
                  onChange={(e) => this.setState({firstnameValue:  e.target.value})}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  autoComplete="lastname"
                  autoFocus
                  className={classes.textField}
                  value={this.state.lastnameValue}
                  onChange={(e) => this.setState({lastnameValue: e.target.value})}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className={classes.textField}
                  value={this.state.emailFormValue}
                  onChange={(e) => this.setState({emailFormValue: e.target.value})}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.passwordValue}
                  onChange={(e) => this.setState({passwordValue: e.target.value})}
                />
                <FormControlLabel
                  control={<Checkbox value="remember"/>}
                  label="Remember me"
                  className={classes.controlLabel}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submitButton}
                  onClick={signUpHandler}
                >
                  Sign up
                </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(SignUpPage);
