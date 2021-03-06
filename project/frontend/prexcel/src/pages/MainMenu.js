import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import pLogo from "./images/prexcel_logo.png";

import {Button, Grid, Paper, TextField} from "@mui/material";

const MainMenu = (props) => {

  function logOut() {
     // todo discard authorization token

     props.onMainMenuHandler(ScreenIds.LOGIN_SCREEN_ID);
  }

   function goToChatBot() {
      props.onMainMenuHandler(ScreenIds.CHAT_BOT_SCREEN_ID);
   }

  function goToMyPresentations() {
    props.onMainMenuHandler(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
  }

   function goToUserAccountDetails() {
      props.onMainMenuHandler(ScreenIds.USER_ACC_DETAILS_SCREEN_ID);
   }

  function goToLivePresentation() {
      props.onMainMenuHandler(ScreenIds.LIVE_PRESENTATION_FEEDBACK_SCREEN_ID);
  }

   function goToNewPresentation() {
      props.onMainMenuHandler(ScreenIds.NEW_PRESENTATION_ID);
   }

   function doNothing() {
     props.onMainMenuHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   function goToTutorialApp() {
      props.onMainMenuHandler(ScreenIds.TUTORIAL_APP_SCREEN_ID);
   }

   function goToTutorialPresentation() {
      props.onMainMenuHandler(ScreenIds.TUTORIAL_PRESENTATION_SCREEN_ID);
   }

   //                <h1 data-testid="prexcel_title_id" style={{color:'whitesmoke', flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
   //                   Prexcel
   //                </h1><br/>
   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} >

               <img src={pLogo} style={{marginTop:"2%", width: 250, height: 250,borderRadius: 400/ 2}} />

               <h1 data-testid="prexcel_title_id" style={{fontStyle: 'italic', color:'whitesmoke', flexDirection:'row', alignItems:'center', justifyContent:'center'}} >The Multifunctional Presentation Assistant</h1>
            </Grid>
            <Grid item xs={4}/>
            <Grid item xs={4}>
               <Paper style={{backgroundColor:'whitesmoke', marginTop: '2.5%', marginBottom:'2.5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
                  <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={goToNewPresentation}>Start a Presentation</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goToMyPresentations}>My Presentations</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goToTutorialApp}>Tutorial on Prexcel</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goToTutorialPresentation}>Tutorial on Presentations</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goToUserAccountDetails}>User-Account-Details</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goToChatBot}>Interactive Q&A Chat Bot</Button> <br/>
                  <Button style={{ marginBottom: '5%'}} variant="contained" onClick={logOut}>Log-Out</Button>
               </Paper>
            </Grid>
            <Grid item xs={4}/>
         </Grid>
      </div>
   );
};

export default MainMenu;