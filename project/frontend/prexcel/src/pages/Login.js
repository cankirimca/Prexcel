import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

// material ui components
import {Button, Grid, Paper, TextField} from "@mui/material";

const Login = (props) => {

  function attemptLogin() {

     // todo check login credentials
     let loginSuccessful = true;

      

     // if successful change to main menu
     if ( loginSuccessful){
        props.onLoginHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
     }
     // otherwise reshow the login screen
     else {
        // todo display login failed message

        props.onLoginHandler(ScreenIds.LOGIN_SCREEN_ID);
     }
  }

   function goToSignUp() {

      props.onLoginHandler(ScreenIds.SIGNUP_SCREEN_ID)
   }

    return (
       <Grid container spacing={2}>

          <Grid item xs={12}>
             <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >Welcome To Prexcel </h1>
          </Grid>

          <Grid item xs={4}/>
          <Grid item xs={4}>
             <Paper style={{marginTop: '50%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>

                <Grid style={{ paddingTop: '5%' }} item xs={12}>
                  Please log-in or create an account to continue:
                </Grid>

                <Grid style={{ marginTop: '5%', }} item xs={12}>
                   <TextField id="outlined-basic" label="Username" variant="outlined" />
                </Grid>

                <Grid style={{ marginTop: '5%'}} item xs={12}>
                   <TextField id="outlined-basic" label="Password" variant="outlined" />
                </Grid>

                <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
                   <Button style={{ marginRight: '5%'}} variant="contained" onClick={attemptLogin}>Log-In</Button>
                   <Button variant="contained" onClick={goToSignUp}>Sign-Up</Button>
                </Grid>

             </Paper>
          </Grid>
          <Grid item xs={4}/>


       </Grid>
    );
};

export default Login;