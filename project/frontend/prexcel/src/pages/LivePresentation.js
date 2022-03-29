import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";
let transcriptRunning = false;

export default function  LivePresentation(props){
   const [fd_flag, setFdFlag] = useState("");
   //const [tokens, setTokens] = useState("");
   
   function startPresentationThreads(){
      fetch('http://localhost:5000/startPresentation', {
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
   }

   function startPresentation() {
      startPresentationThreads();
      getFaceDetectionFlag();
   }

   function endPresentation() {
      fetch('http://localhost:5000/endPresentation', {
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
      //transcript = "Stopped"
      clearInterval();
      transcriptRunning = true;
   }

  /* function enableTokens(){
         setInterval(async function (){ 
            await fetch('http://localhost:5000/getTranscript', {
            method: 'GET',
            headers: {
               'Content-Type':'application/json'
            },
            })
            .then(resp => resp.json())
            .then((data) => {
               setTokens(data);
            })
            .catch(error => console.log(error))
         }, 500);
   }*/

   function getFaceDetectionFlag(){
      setInterval(async function (){ 
         await fetch('http://localhost:5000/getFaceDetectionFlag', {
         method: 'GET',
         headers: {
            'Content-Type':'application/json'
         },
         })
         .then(resp => resp.json())
         .then((data) => {
            setFdFlag(data);
         })
         .catch(error => console.log(error))
      }, 500);
   }


  function goBackToMainMenu() {
   props.onLivePresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
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
                 <Paper style={{marginTop: '15%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
                    <p> Face Detection Flag: </p> <br/>
                    {fd_flag}
                 </Paper>
              </Grid>
              <Grid item xs={2}/>


              <Grid item xs={4}/>
              <Grid item xs={4}>
                 <Paper style={{marginTop: '15%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>

                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={startPresentation}>Start Presentation</Button> <br/>
                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={endPresentation}>End Presentation</Button> <br/>
                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Back to Main Menu</Button> <br/>

                 </Paper>
              </Grid>
              <Grid item xs={4}/>

           </Grid>
        </div>

    );
};
