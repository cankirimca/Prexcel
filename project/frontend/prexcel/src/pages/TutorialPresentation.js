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
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"2%"}} >
                  TUTORIAL ON GIVING A PRESENTATION
               </h1>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper style={{backgroundColor:'whitesmoke', padding:"5%", marginTop: '2.5%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
                  <h3>Important Points About Presentations</h3>
                  <p>text</p>
                  <h3>Look To The Camera!</h3>
                  <p>text</p>
                  <h3>How to Speak Effectively?</h3>
                  <p>text</p>
               </Paper>

               <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Go Back</Button>

            </Grid>
            <Grid item xs={2}/>
         </Grid>
      </div>
   );
};

export default TutorialPresentation;