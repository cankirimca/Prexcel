import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";
let transcriptRunning = false;

export default function  LivePresentation(props){
   const [transcript, setTranscript] = useState("");
   
   function startRecording() {
      fetch('http://localhost:5000/livePresentation', {
         method: 'GET',
         headers: {
            'Content-Type':'application/json'
         },
      })
      .then(resp => resp.json())
      .then((data) => {
         console.log(data)
      })
      .catch(error => console.log(error))
      console.log("can");
      
      transcriptRunning = true;
   }

   function enableTranscript(){
         setInterval(async function (){ 
            await fetch('http://localhost:5000/getTranscript', {
            method: 'GET',
            headers: {
               'Content-Type':'application/json'
            },
            })
            .then(resp => resp.json())
            .then((data) => {
               setTranscript(data);
            })
            .catch(error => console.log(error))
         }, 500);
   }

  function saveTranscript(){

  }

  // if(transcriptRunning){
  //    getTranscript();
  // }

    return (
        <div>
           <Grid container spacing={2}>

              <Grid item xs={12}>
                 <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                    Prexcel
                 </h1><br/>
                 <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                    Live Presentation
                 </h1><br/>
              </Grid>

              <Grid item xs={2}/>
              <Grid item xs={8}>
                 <Paper style={{marginTop: '25%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
                    <p> Transcript of the user's speech: </p> <br/>
                    {transcript}
                 </Paper>
              </Grid>
              <Grid item xs={2}/>


              <Grid item xs={4}/>
              <Grid item xs={4}>
                 <Paper style={{marginTop: '25%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>

                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={startRecording}>Start Presentation</Button> <br/>
                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={enableTranscript}>Enable Transcript</Button> <br/>
                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={saveTranscript}>Save Transcript</Button> <br/>

                 </Paper>
              </Grid>
              <Grid item xs={4}/>

           </Grid>
        </div>

    );
};
