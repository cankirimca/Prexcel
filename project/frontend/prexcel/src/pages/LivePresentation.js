import React, {useState, useEffect, useRef} from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

let transcriptRunning = false;

var interval1 = 0;
var interval2 = 0;
var interval3 = 0;

export default function LivePresentation(props) {

   const [playing, setPlaying] = useState(false);

   const [fd_flag, setFdFlag] = useState("");
   const [decibel_flag, setDecibel] = useState("");
   const [transcript, setTranscript] = useState("");
   


   //const [tokens, setTokens] = useState("");

   //disable end presentation button
   //document.getElementById("endPresentationButton").disabled = true;
   const [endButtonDisabled, setEndButtonDisabled] = useState(true);
   const [startButtonDisabled, setStartButtonDisabled] = useState(false);

   const [flagGap, setFlagGap] = useState(true);

   function startVideo() {
      setPlaying(true);
      navigator.getUserMedia(
         {
            video: true,
         },
         (stream) => {
            let video = document.getElementsByClassName("app__videoFeed")[0];
            if (video) {
               video.srcObject = stream;
            }
         },
         (err) => console.error(err)
      );
   };

   function stopVideo() {
      setPlaying(false);
      let video = document.getElementsByClassName("app__videoFeed")[0];
      video.srcObject.getTracks()[0].stop();
   }

   function changeFlagGap() {
      setFlagGap(!flagGap)
   }

   function startPresentationThreads() {
      fetch('http://localhost:5000/startPresentation', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
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
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      fetch('http://localhost:5000/endPresentation', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         },
      })
         .then(resp => resp.json())
         .then((data) => {
            console.log(data)
         })
         .catch(error => console.log(error))
      console.log("can");
      //transcript = "Stopped"
      
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

   function getFaceDetectionFlag() {
      interval1 = setInterval(async function () {
         await fetch('http://localhost:5000/getFaceDetectionFlag', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) => {
               setFdFlag(data)
            })
            .catch(error => console.log(error))
      }, 500);
   }

   function getDecibel() {
      interval2 = setInterval(async function () {
         await fetch('http://localhost:5000/getDecibelFlag', {
            method: 'GET',
            headers: {
               'ContentType': 'application/json',
               'Accept': 'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) => {
               setDecibel(data)
            })
            .catch(error => console.log(error))
      }, 500);
   }

   function getTranscript() {
      interval3 = setInterval(async function () {
         await fetch('http://localhost:5000/getTranscript', {
            method: 'GET',
            headers: {
               'ContentType': 'application/json',
               'Accept': 'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) => {
               setDecibel(data)
            })
            .catch(error => console.log(error))
      }, 500);
   }

   function goBackToMainMenu() {
      props.onLivePresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   //</p> <br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> <br/><br/>

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1 style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  Live Presentation for "{props.newPresentationName}"
               </h1>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={7}>
               <Paper sx={{marginTop: '1.7%', backgroundColor: 'lightblue'}} align="center"
                      elevation={1}>
                  <video  width='80%' muted autoPlay className="app__videoFeed"/><br/>
               </Paper>
               {playing ? (
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={stopVideo}> Stop Camera </Button>) : (
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={startVideo}> Start Camera </Button>)}

            </Grid>
            <Grid item xs={3}>

               <Paper sx={{backgroundColor: '#E5E5E5'}} align="left" elevation={3}>
                  <p style={{paddingTop: '2%', marginLeft: '5%'}}> Face Detection: {fd_flag}</p> <br/>
                  <p style={{marginLeft: '5%'}}> Current Decibel: {decibel_flag}</p> <br/>
                  <p style={{marginLeft: '5%'}}> Transcript (To be removed I believe) : {transcript} </p> <br/>
               </Paper>

               {flagGap &&
                  <Paper style={{
                     backgroundColor: '#E5E5E5',
                     marginTop: '5%',
                     marginBottom: '2%',
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }} align="left" elevation={3}>
                     <h3 style={{paddingTop: '2%', marginLeft: '5%'}}> Word Recommendations</h3>
                     <ul style={{paddingTop: '2%', paddingBottom: '2%', marginLeft: '5%'}}>
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


            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper style={{
                  backgroundColor: '#E5E5E5',
                  marginTop: '1%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
               }} elevation={0}>

                  <Button disabled={startButtonDisabled} id="startPresentationButton" style={{backgroundColor:'#507786', margin: '1.5%'}}
                          variant="contained" onClick={startPresentation}>Start Presentation</Button>
                  <Button disabled={endButtonDisabled} id="endPresentationButton" style={{backgroundColor:'#507786', margin: '1.5%'}}
                          variant="contained" onClick={endPresentation}>End Presentation</Button>
                  <Button style={{backgroundColor:'#507786', margin: '1.5%'}} variant="contained" onClick={goBackToMainMenu}>Back to Main
                     Menu</Button>


                  <Button style={{backgroundColor:'#507786', margin: '1.5%'}} variant="contained" onClick={changeFlagGap}>Change flagGap (will be
                     removed)</Button>


               </Paper>
            </Grid>
            <Grid item xs={2}/>

         </Grid>
      </div>

   );
};