import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";

const SignUp = (props) => {

   function attemptSignup() {

      // todo check login credentials
      let signUpSuccessful = true;

      // if successful change to main menu
      if ( signUpSuccessful){
         props.onSignUpHandler(ScreenIds.LOGIN_SCREEN_ID);
      }
      // otherwise reshow the login screen
      else {
         // todo display signup failed message

      }
   }

   function goToLogin() {

      props.onSignUpHandler(ScreenIds.LOGIN_SCREEN_ID)
   }

   return (
      <Grid container spacing={2}>

         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h1> Sign Up To Prexcel</h1>
            <Paper style={{marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p style={{paddingTop: '5%'}}> Please fill in the following information to sign-up.</p>
               <Grid style={{ marginTop: '5%'}} item xs={12}>
                  <TextField id="outlined-basic" label="Username" variant="outlined" />
               </Grid>
               <Grid style={{ marginTop: '5%'}} item xs={12}>
                  <TextField id="outlined-basic" label="Email" variant="outlined" />
               </Grid>
               <Grid style={{ marginTop: '5%'}} item xs={12}>
                  <TextField id="outlined-basic" label="Password" variant="outlined" />
               </Grid>
               <Grid style={{ marginTop: '5%', marginBottom: '5%'}} item xs={12}>
                  <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
               </Grid>
               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
                  <Button style={{ marginRight: '5%'}} variant="contained" onClick={attemptSignup}>SignUp</Button>
                  <Button variant="contained" onClick={goToLogin}>Cancel</Button>
               </Grid>
            </Paper>



         </Grid>
         <Grid item xs={3}/>



      </Grid>


   );
}

export default SignUp;