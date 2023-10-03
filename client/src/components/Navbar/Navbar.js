import React, { useState,useEffect } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography}  from "@material-ui/core";
import useStyles from './styles'
import memories from '../../images/memories.png'
import {Link,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import decode from 'jwt-decode';
function Navbar() {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () =>{
        dispatch({type: 'LOGOUT' })
        setUser(null)
        navigate('/auth');
        
    }

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit" >
        <div className='classes.brandContainer'>
        <Typography component={Link} to="/" className={classes.heading} varaint="h2" align="center">
    Memories
    </Typography>
    <img className={classes.image} src={memories} alt="memories" height={60} ></img>
        </div>
        <Toolbar className={classes.toolbar}>
            {
                user?.result ?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" component={Link} to="/auth" className={classes.logout} color="primary">Sign In</Button>
                )
            }
        </Toolbar>

    </AppBar>
  )
}

export default Navbar
