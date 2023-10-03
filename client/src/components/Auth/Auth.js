import React, { useState,useEffect } from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core'
import useStyles from './Style'
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import { loadGapiInsideDOM } from "gapi-script";
import { useNavigate  } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
      (async () => {
        await loadGapiInsideDOM();
      })();
    });

    const switchMode = () => {
       
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    const handleSubmit = (e) => {

      e.preventDefault();

      if (isSignup) {
        dispatch(signup(form, navigate));
      } else {
        dispatch(signin(form, navigate));
      }

    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: AUTH, data: { result, token } });
    
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };
    
      const googleError = (error) => {
        console.log(error);
        alert('Google Sign In was unsuccessful. Try again later');}




  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half></Input>
                                <Input name='lastName' label='Last Name' handleChange={handleChange}  half></Input>
                            </>
                        )
                    }
                                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
            clientId="919474683885-1mog5alug7740nd53l0nj6rnfq6f66dc.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />    

                <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth
