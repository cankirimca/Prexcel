import React, {useState, useEffect, useRef} from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";


export default function NewPresentation(props) {

   function goToMainMenu() {

      props.onNewPresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID)
   }

   // TODO for goToLivePresentation, goToUploadPresentation pass the presentation name as prop as well
   function goToLivePresentation() {
      const name = document.getElementById('presentation_name').value;
      if (name.length > 0) {
         props.onNewPresentationName(name);
         props.onNewPresentationHandler(ScreenIds.PROCESSING_PRESENTATION_SCREEN_ID)
      }

   }

   // todo
   function goToUploadPresentation() {

      const name = document.getElementById('presentation_name').value;
      if (name.length > 0) {
         props.onNewPresentationName(name);
         props.onNewPresentationHandler(ScreenIds.UPLOAD_PRESENTATION_SCREEN_ID);
      }

      // props.onNewPresentationHandler(ScreenIds.PROCESSING_PRESENTATION_SCREEN_ID)
   }

   return (
      <Grid container spacing={2}>

         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h1> Create A New Presentation...</h1>
            <Paper style={{
               marginTop: '20%',
               marginBottom: '5%',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: '#E5E5E5'
            }} elevation={3}>
               <p style={{paddingTop: '5%'}}> Enter the name for your presentation:</p>


               <Grid style={{marginTop: '5%'}} item xs={12}>
                  <TextField sx={{backgroundColor:'white'}} id="presentation_name" label="Name of the presentation" variant="outlined"/>
               </Grid>

               <Grid style={{marginTop: '5%', paddingBottom: '5%'}} item xs={12}>
                  <Button style={{marginRight: '5%'}} variant="contained" onClick={goToLivePresentation}>Perform a
                     Live Presentation</Button>
                  <Button style={{marginRight: '5%'}} variant="contained" onClick={goToUploadPresentation}>Upload a
                     Recording</Button>
                  <Button variant="contained" onClick={goToMainMenu}>Cancel</Button>
               </Grid>


            </Paper>

         </Grid>
         <Grid item xs={3}/>


      </Grid>


   );
}