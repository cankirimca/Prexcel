import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";
let transcriptRunning = false;

export default function  LivePresentation(props){
   const [fd_flag, setFdFlag] = useState("");
   const [decibel_flag, setDecibel] = useState("");
   const [transcript, setTranscript] = useState("");
   //const [tokens, setTokens] = useState("");
   
   //disable end presentation button
   //document.getElementById("endPresentationButton").disabled = true;
   const [endButtonDisabled, setEndButtonDisabled] = useState(true);
   const [startButtonDisabled, setStartButtonDisabled] = useState(false);

   const [flagGap, setFlagGap] = useState(true);

   function changeFlagGap(){
      setFlagGap( !flagGap)
   }

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
      //document.getElementById("startPresentationButton").disabled = true;
      //document.getElementById("endPresentationButton").disabled = false;
      setStartButtonDisabled(true);
      setEndButtonDisabled(false);
      startPresentationThreads();
      getFaceDetectionFlag();
      getDecibel();
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
      //document.getElementById("endPresentationButton").disabled = true;
      setEndButtonDisabled(true);
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

   function getDecibel() {
      setInterval(async function() {
         await fetch('http://localhost:5000/getDecibelFlag', {
            method: 'GET',
            headers: {
               'ContentType':'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) =>{
               setDecibel(data);
            })
            .catch(error => console.log(error))
      }, 500);
   }

   function getTranscript() {
      setInterval(async function() {
         await fetch('http://localhost:5000/getTranscript', {
            method: 'GET',
            headers: {
               'ContentType':'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) =>{
               setDecibel(data);
            })
            .catch(error => console.log(error))
      }, 500);
   }

   function goBackToMainMenu() {
      props.onLivePresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                  Prexcel
               </h1>
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                  Live Presentation
               </h1>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={6}>
               <Paper align="left" elevation={3}>

                  <p style={{paddingTop: '2%', marginLeft:'5%'}}> Buralar hep kamera feed
                  </p> <br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> <br/><br/>

               </Paper>

            </Grid>
            <Grid item xs={4}>

               <Paper align="left" elevation={3}>
                  <p style={{paddingTop: '2%', marginLeft:'5%'}}> Face Detection: {fd_flag}</p> <br/>
                  <p style={{marginLeft:'5%'}}> Current Decibel: {decibel_flag}</p> <br/>
                  <p style={{marginLeft:'5%'}}> Transcript (To be removed I believe) : {transcript} </p> <br/>
               </Paper>

               {flagGap &&
                  <Paper style={{marginTop: '5%', marginBottom:'2%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} align="left" elevation={3}>
                     <h3 style={{paddingTop: '2%', marginLeft:'5%'}}> Word Recommendations</h3>
                     <ul style={{paddingTop: '2%', paddingBottom: '2%', marginLeft:'5%'}}>
                        <li> word 1</li>
                        <li> word 2</li>
                        <li> word 3</li>
                        <li> word 4</li>
                        <li> word 5</li>
                     </ul>
                  </Paper>
               }


            </Grid>
            <Grid item xs={1}/>


            <Grid item xs={3}/>
            <Grid item xs={6}>
               <Paper style={{marginTop: '1%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={0}>

                  <Button disabled={startButtonDisabled} id="startPresentationButton" style={{ margin: '5%'}} variant="contained" onClick={startPresentation}>Start Presentation</Button>
                  <Button disabled={endButtonDisabled} id="endPresentationButton" style={{ margin: '5%'}} variant="contained" onClick={endPresentation}>End Presentation</Button>
                  <Button style={{ margin: '5%'}} variant="contained" onClick={goBackToMainMenu}>Back to Main Menu</Button>


                  <Button style={{ margin: '5%'}} variant="contained" onClick={changeFlagGap}>Change flagGap (will be removed)</Button>


               </Paper>
            </Grid>
            <Grid item xs={3}/>

         </Grid>
      </div>

   );
};