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
import Copyright from "./Copyright";
import useStyles from "./Style";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import backgroundImage from './background.jpg';
import { BASE_API_URL } from '../../config'

interface PropsTypes extends WithStyles<typeof useStyles>{
  isSignedIn: any;
}

interface StateTypes {
    emailFormValue: string;
    passwordValue: string;
}

class SignInPage extends React.Component<PropsTypes> {

  signInMutation = `
    mutation ($data: SignInInput){
      signin(data:$data){
        user{
          id
        }
      }
    }
  `


  state = {
        emailFormValue: "",
        passwordValue: "",
    };
    render(){
      const signInHandler: (e: any) => void = async (e:any) => {
        e.preventDefault();
          const response = await fetch(BASE_API_URL, {
            method: 'POST',
            redirect: 'manual',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: this.signInMutation,
              variables: {
                data: {
                  email: this.state.emailFormValue,
                  password: this.state.passwordValue
                }
              }
            })
          })
          const res = await response.json();
          if(res.errors || res.data.singin === null){
            alert('Проверьте корректность введенных данных')
            return null
          }
          console.log(res);
          window.localStorage.setItem('id', res.data.signin.user.id)
          window.location.reload();
      }

        const { classes } = this.props;
        return(
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} style={{backgroundImage: `url(${backgroundImage})`}} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={signInHandler} noValidate>
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
                  onClick={signInHandler}
                >
                  Sign in
                </Button>
                <Grid item>
                  <Link className={classes.link} href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
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

export default withStyles(useStyles, { withTheme: true })(SignInPage);