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

   const [id, setID] = useState([]);
   const [username, setUsername] = useState([]);
   const [presentationCount, setPresentationCount] = useState([]);   
   const [email, setEmail] = useState([]);   

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

   function getUserInfo(){
      let success = true;
      fetch('http://localhost:5000/getUserInfo', {
         method: 'GET',
         headers: {
            'Content-Type':'application/json'
         },

      })
         .then((resp) => {
            return resp.json()
         })
         .then((data) => {
            setUsername(data[0])
            setEmail(data[2])
            setID(data[3])
            setPresentationCount(data[4])
         })
         .catch(error => console.log(error))

      return success;
   };

   getUserInfo();


   return (
      <Grid container spacing={2}>
         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h1 style={{color:'whitesmoke'}}>Account details</h1>
            <Paper style={{backgroundColor:'whitesmoke', marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p style={{color:'black', paddingTop: '5%'}}> Your current account details are as follows:</p>
               <Grid style={{ marginTop: '5%' , marginLeft:'5%'}} item xs={12} align="left">
                  <p style={{color:'black'}}> <b>User name:</b> {username}</p>
               </Grid>
               <Grid style={{ marginTop: '5%' , marginLeft:'5%'}} item xs={12} align="left">
                  <p style={{color:'black'}}><b>User id:</b> {id}</p>
               </Grid>
               <Grid style={{ marginTop: '5%', marginLeft:'5%'}} item xs={12} align="left">
                  <p style={{color:'black'}}><b>Number of presentations in your account:</b> {presentationCount}</p>
               </Grid>
               <Grid style={{ marginTop: '5%', marginLeft:'5%'}} item xs={12} align="left">
                  <p style={{color:'black'}}><b>E-mail address:</b> {email}</p>
               </Grid>
               <Grid style={{ color:'black', marginTop: '5%', marginBottom: '5%'}} item xs={12}>
                     You may delete your account, but beware, this process cannot be reversed!
               </Grid>
               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
                  <Button style={{marginRight: '5%'}} variant="contained" onClick={attemptDelete}>Delete Account</Button>
                  <Button data-testid="user_account_details_button_id" variant="contained" onClick={goToMainMenu}>Back To Main Menu</Button>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={3}/>



      </Grid>


   );
}

export default UserAccountDetails;