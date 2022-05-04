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
   let path = ""

   /*const [openFileSelector, { filesContent, loading }] = useFilePicker({
      accept: '.txt',
      readAs: 'DataURL'
   });*/

   function goToMainMenu() {
      props.onUploadPresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID)
   }

   // todo to the presentation details of the last processed presentation
   function goToPresentationDetails() {

      // go to the details of the presentation that was processed
      props.onUploadPresentationHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   // todo
   function processRecording() {
      setFlagProcessingPresentation(true);

      props.onUploadPresentationHandler(ScreenIds.LOADING_SCREEN);

      // todo set the flag processing presentation such that no other button is clickable while presentation is being processed.
      const processPresentation = (presentationData) => {
         fetch('http://localhost:5000/processUploadedPresentation', {
            method: 'POST',
            headers: {
               'Content-Type':'application/json'
            },
            body:JSON.stringify(presentationData)
         })
         .then((resp) => {
            console.log(resp.json())
            return resp.json()
         })

         .catch(error => console.log(error))
      };

      const presentationData = {
         "path": path,
         "presentation_name": props.newPresentationName, //todo add real name
      }


      processPresentation(presentationData);

      // todo Alternatively, switch them to a new page and remove the continue to report details  button

      // TODO LOGIC HERE
      setPresentationProcessed(true);
   }

   function onFileSelected(){
      setFlagPresentationSelector(true);
      console.log("called function");
      let file = document.getElementById("file") 
      if(file){
         path = file.files[0].path;
         console.log("in if");
      }
   }
   /*async function selectPresentation(){
      //console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
      const dir = await window.showDirectoryPicker();
      console.log("can");
      console.log(dir.getFileHandle());
      //openFileSelector();
      setFlagPresentationSelector(true);
   }*/

   return (
      <Grid container spacing={2}>

         <Grid item xs={2}/>
         <Grid item xs={8}>
            <h1>Select a Recording To Analyze...</h1>
            <Paper style={{backgroundColor:'#E5E5E5', marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p style={{paddingTop: '5%'}}>Name of the presentation: {props.newPresentationName}</p>
               <input id="file" type="file" onChange={onFileSelected} onInput={onFileSelected}/>

               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>

                  <Button style={{ margin: '5%'}} variant="contained" onClick={goToMainMenu}>Cancel</Button>

                  {/* flagPresentationSelector === false &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={selectPresentation}>Select a Recording</Button>
   */}
                  {/* flagPresentationSelector &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={() => selectPresentation}>Reselect a Recording</Button>
*/}

                  { flagPresentationSelector === false &&
                     <Button style={{ margin: '5%'}} variant="contained" disabled>Process The Recording</Button>
                  }

                  { flagPresentationSelector &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={processRecording}>Process The Recording</Button>
                  }

                  { /*flagPresentationProcessed &&
                     <Button style={{ margin: '5%'}} variant="contained" onClick={goToPresentationDetails}>Continue to the Report</Button>
                  */}

                  {/* flagPresentationSelector && flagProcessingPresentation && flagPresentationProcessed === false &&
                     <Button style={{ margin: '5%'}} variant="contained" disabled>Your presentation is being processed...</Button>
                  */}
                  {/* flagPresentationSelector === false &&
                     <Button style={{ marginRight: '5%'}} variant="contained" disabled>Continue to the Report</Button>
                  */}

               </Grid>
            </Paper>

         </Grid>
         <Grid item xs={2}/>



      </Grid>


   );
}