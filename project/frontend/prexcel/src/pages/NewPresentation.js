import React, {useState, useEffect, useRef} from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Grid,
   Paper,
   TextField
} from "@mui/material";
import DialogBox from "./DialogBox";


export default function NewPresentation(props) {

   const [dialogOpen, setDialogOpen] = useState(false);
   const handleClose = () => {
      setDialogOpen(false);
   };

   function goToMainMenu() {

      props.onNewPresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID)
   }

   // TODO for goToLivePresentation, goToUploadPresentation pass the presentation name as prop as well
   function goToLivePresentation() {
      const name = document.getElementById('presentation_name').value;
      if (name.length > 0) {
         props.onNewPresentationName(name);
         props.onNewPresentationHandler(ScreenIds.PROCESSING_PRESENTATION_SCREEN_ID)
      } else {
         console.log("dialog box opening");
         setDialogOpen(true);
      }

   }

   // todo
   function goToUploadPresentation() {

      const name = document.getElementById('presentation_name').value;
      if (name.length > 0) {
         props.onNewPresentationName(name);
         props.onNewPresentationHandler(ScreenIds.UPLOAD_PRESENTATION_SCREEN_ID);
      } else {
         console.log("dialog box opening");
         setDialogOpen(true);
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
            }} elevation={8}>
               <p style={{paddingTop: '5%'}}> Enter the name for your presentation:</p>

               <Grid style={{marginTop: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '33%', marginLeft: '33%'}} elevation={4}>
                     <TextField sx={{width: '99%', border: "2px solid #507786", borderRadius: '5px',}}
                                id="presentation_name" label="Name of the presentation"
                                variant="filled"/>
                  </Paper>
               </Grid>

               <Grid style={{marginTop: '5%', paddingBottom: '5%'}} item xs={12}>
                  <Button style={{backgroundColor: '#507786', marginRight: '5%'}} variant="contained"
                          onClick={goToLivePresentation}>Perform a
                     Live Presentation</Button>
                  <Button style={{backgroundColor: '#507786', marginRight: '5%'}} variant="contained"
                          onClick={goToUploadPresentation}>Upload a
                     Recording</Button>
                  <Button style={{backgroundColor: '#507786',}} variant="contained"
                          onClick={goToMainMenu}>Cancel</Button>
                  <DialogBox open={dialogOpen} onClose={handleClose}
                             dialogContent={"Prexcel is going to analyze your presentation, it needs a valid presentation name to proceed. Kind Regards."}
                             dialogTitle={"Presentation name is required!"}/>
               </Grid>


            </Paper>

         </Grid>
         <Grid item xs={3}/>


      </Grid>


   );
}