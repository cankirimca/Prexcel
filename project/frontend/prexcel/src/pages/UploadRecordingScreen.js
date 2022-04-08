import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";
import { useFilePicker } from 'use-file-picker';


export default function UploadRecordingScreen(props) {

   const [flagPresentationSelector, setFlagPresentationSelector] = useState(false);
   const [flagPresentationProcessed, setPresentationProcessed] = useState(false);

   const [flagProcessingPresentation, setFlagProcessingPresentation] = useState(false);


   const [openFileSelector, { filesContent, loading }] = useFilePicker({
      accept: '.txt',
   });

   function goToMainMenu() {
      props.onNewPresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID)
   }

   // todo to the presentation details of the last processed presentation
   function goToPresentationDetails() {

      // go to the details of the presentation that was processed
      props.onNewPresentationHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   // todo
   function processRecording() {
      setFlagProcessingPresentation(true);

      // todo one thing that could be / should be done here, depending on how much time processing takes is to
      // todo set the flag processing presentation such that no other button is clickable while presentation is being processed.

      // todo Alternatively, switch them to a new page and remove the continue to report details  button


      setPresentationProcessed(true);
   }

   function selectPresentation(){
      openFileSelector();
      setFlagPresentationSelector(true);
   }

   return (
      <Grid container spacing={2}>

         <Grid item xs={2}/>
         <Grid item xs={8}>
            <h1>Select a Recording To Analyze...</h1>
            <Paper style={{marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p style={{paddingTop: '5%'}}>Name of the presentation: (Bu kısım props olarak geçirilmeli)</p>
               {filesContent.map((file, index) => (
                  <div>
                     <h2>Selected File: {file.name}</h2>
                     <br />
                  </div>
               ))}

               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>

                  <Button style={{ margin: '5%'}} variant="contained" onClick={goToMainMenu}>Cancel</Button>

                  { flagPresentationSelector === false &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={selectPresentation}>Select a Recording</Button>
                  }
                  { flagPresentationSelector &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={() => openFileSelector()}>Reselect a Recording</Button>
                  }

                  { flagPresentationSelector == false &&
                     <Button style={{ margin: '5%'}} variant="contained" disabled>Process The Recording</Button>
                  }
                  { flagPresentationSelector &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={processRecording}>Process The Recording</Button>
                  }

                  { flagPresentationProcessed &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={goToPresentationDetails}>Continue to the Report</Button>
                  }
                  { flagPresentationSelector && flagProcessingPresentation && flagPresentationProcessed === false &&
                     <Button style={{ margin: '5%'}} variant="contained" disabled>Your presentation is being processed...</Button>
                  }
                  { flagPresentationSelector === false &&
                     <Button style={{ marginRight: '5%'}} variant="contained" disabled>Continue to the Report</Button>
                  }

               </Grid>
            </Paper>

         </Grid>
         <Grid item xs={2}/>



      </Grid>


   );
}