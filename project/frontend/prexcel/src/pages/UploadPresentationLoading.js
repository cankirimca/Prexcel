import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";
import { useFilePicker } from 'use-file-picker';

export default function UploadPresentationLoading(props) {


   //const [processingDone, setProcessingDone] = useState(false);


   function goToMainMenu() {
      props.onPresentationLoadingHandler(ScreenIds.MAIN_MENU_SCREEN_ID)
   }

   // todo I think we scrape this off, just send the user back to my presentations or main menu
   function goToPresentationDetails() {
      console.log(":(");
   }

   /*function setProcessingState(){
      setProcessingDone(!processingDone);
   }*/

   // <Button style={{margin: '5%'}} variant="contained" onClick={setProcessingState}>Set Recording Processed
   //                      (Demo/TB Removed)</Button>

   const processingNotDone =
      <Grid container spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={8}>
               <h1>Processing Your Presentation...</h1>
               <Paper style={{
                  backgroundColor: '#E5E5E5',
                  marginTop: '20%',
                  marginBottom: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '2%',
               }} elevation={3}>
                  <p style={{margin: "2%"}}> <i> Please wait while your presentation is being processed... </i> </p>

                  <Button style={{margin: '5%'}} variant="contained" onClick={goToMainMenu}>Cancel</Button>
               </Paper>

            </Grid>
            <Grid item xs={2}/>
      </Grid>;

   const processingFinished =
      <Grid container spacing={2}>

         <Grid item xs={2}/>
         <Grid item xs={8}>
            <h1>Your presentation is processed!</h1>
            <Paper style={{
               backgroundColor: '#E5E5E5',
               marginTop: '20%',
               marginBottom: '5%',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'center',
               paddingTop: '2%',
            }} elevation={3}>
               <p style={{margin: "2%"}}> You can now find your presentation under the MyPresentations screen. </p>

               <Button style={{margin: '5%'}} variant="contained" onClick={goToMainMenu}>Continue To Main Menu</Button>
            </Paper>

         </Grid>
         <Grid item xs={2}/>

      </Grid>;


   return (
      <Grid container spacing={2}>
         { !props.uploadDone &&
            processingNotDone
         }
         { props.uploadDone &&
            processingFinished
         }

      </Grid>



   );
}