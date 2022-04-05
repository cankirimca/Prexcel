import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";


// TODO
const deleteUser = (currUser) => {

   return false;
};

const UserAccountDetails = (props) => {

   // TODO
   function attemptDelete() {

      const currUser = null; // TODO
      let deleteSuccessful = deleteUser( currUser);

      // if successful change to main menu
      if ( deleteSuccessful){
         goToLogin();
      }

      else {
         // todo display signup failed message

      }
   }

   function goToLogin() {
      props.onUserAccountDetailsHandler(ScreenIds.LOGIN_SCREEN_ID);
   }

   function goToMainMenu(){
      props.onUserAccountDetailsHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   return (
      <Grid container spacing={2}>
         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h1>Account details</h1>
            <Paper style={{marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p style={{paddingTop: '5%'}}> Your current account details are as follows:</p>
               <Grid style={{ marginTop: '5%' , marginLeft:'5%'}} item xs={12} align="left">
                  <p>User name: </p>
               </Grid>
               <Grid style={{ marginTop: '5%', marginLeft:'5%'}} item xs={12} align="left">
                  <p>Number of presentations in your account: </p>
               </Grid>
               <Grid style={{ marginTop: '5%', marginLeft:'5%'}} item xs={12} align="left">
                  <p>Registration date: </p>
               </Grid>
               <Grid style={{ marginTop: '5%', marginBottom: '5%'}} item xs={12}>
                     You may delete your account, but beware, this process cannot be reversed!
               </Grid>
               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
                  <Button style={{ marginRight: '5%'}} variant="contained" onClick={attemptDelete}>Delete Account</Button>
                  <Button variant="contained" onClick={goToMainMenu}>Back To Main Menu</Button>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={3}/>



      </Grid>


   );
}

export default UserAccountDetails;