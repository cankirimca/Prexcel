import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

const TutorialPresentation = (props) => {

   function goBackToMainMenu(){
      props.onTutorialPresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} >
               <h1 style={{color:'whitesmoke', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"2%"}} >
                  TUTORIAL ON GIVING A PRESENTATION
               </h1>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper style={{backgroundColor:'whitesmoke', padding:"2%", marginTop: '2%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
                  <h3>Important Points About Presentations</h3>
                     <p>Make sure your presentation has a clear objective.</p>
                     
                     <p>Make sure that you have rehearsed your presentation enough times.</p>
                     
                     <p>Make sure that you do not add walls of text to your presentation slides.</p>

                  <br/>

                  <h3>Look To The Camera!</h3>
                  <p>Make sure to keep eye contact with your audience at all times. Since, nowadays the presentations have shifted
                     to an online space; altough it is unintuitive to most, one must keep their face rotated towards the camera.
                  </p>

                  <br/>
                  
                  <h3>How to Speak Effectively?</h3>
                  <p>When presenting in online presentations, usually the presenters wear headphones, and when one does not 
                     hear themselves talk; it is harder to adjust the volume of the voice and the speed of the speech. However,
                     with practise and the feedback given from Prexcel, improving oneself is easy.
                  </p>
               </Paper>

               <Button data-testid="tutorial_presentation_cancel_button_id" style={{ marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Go Back</Button>

            </Grid>
            <Grid item xs={2}/>
         </Grid>
      </div>
   );
};

export default TutorialPresentation;