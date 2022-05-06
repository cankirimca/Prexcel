import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

const TutorialApp = (props) => {

   function goBackToMainMenu(){
      props.onTutorialAppHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} >
               <h1 style={{color:'whitesmoke', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"2%"}} >
                  TUTORIAL ON PREXCEL
               </h1>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper style={{backgroundColor:'whitesmoke', padding:"2%", marginTop: '2%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
                  <h3>How to Use Prexcel</h3>
                  <p>There are two main use cases within Prexcel, starting a live presentation, and uploading a presentation. When starting a live presentation, follow these steps; 
                  
                     Go to the "Start a Presentation" tab, enter the name of your presentation and the select the option
                     for starting a live presentation. You will have a chance to calibrate your camera in this screen.
                     Once you continue to presentation screen, you can start the presentation by the relevant button.
                     You will see the your face detection and volume on the left, as well as the word recommendations right below them.
                     Your transcript will also be printed on the screen. You can end the presentation at any time and return to main menu.

                     For uploading a previous presentation, follow these steps;

                     Go to the "Start a Presentation" tab,  enter the name of your presentation and the select the option
                     for uploading a presentation. Your presentation will be processed. You will not be able to move to
                     any other screen during this time. Once finished, you can see your detailed analysis report from the
                     My Presentations" screen.
                  </p>

                  <h3>How Prexcel Evaluates Presentations</h3>
                  <p>Your presentation is graded based on 3 criteria. First of these is the face detection score,
                     which is a measure of how long you kept face contact with the camera. Second is the gap score, which is a 
                     measure of how much big gaps you had in your speech. Final score is the filler words/dragged words score,
                     which is determined based on how many words you dragged, or repeated during the presentation.
                  </p>

                  <h3>How Does Live Feedback Work?</h3>
                  <p>Live feedback functionality is powered by the machine learning algorithms that are embedded in the system. These machine learning systems
                     analyze the live presentation concurrently and provide instantenous feedback. The feedbacks that Prexcel provides include,
                     speech volume warnings (whether the decibel of the presenters voice is too high, high, low or too low), face detection warnings (whether 
                     the presenter is facing the camera directly or not), and word recommendations for when the presenter gets stuck during the presentation. 
                  </p>
               </Paper>

               <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Go Back</Button>

            </Grid>
            <Grid item xs={2}/>
         </Grid>
      </div>
   );
};

export default TutorialApp;