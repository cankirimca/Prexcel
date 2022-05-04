import React, {useState, useEffect, useRef} from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

let transcriptRunning = false;

var interval1 = 0;
var interval2 = 0;
var interval3 = 0;
var interval4 = 0;

export default function LivePresentation(props) {


   const [fd_flag, setFdFlag] = useState("");
   const [decibel_flag, setDecibel] = useState("");
   const [transcript, setTranscript] = useState("");
   const [recommendations, setRecommendations] = useState([]);
   const [recommendation1, setRecommendation1] = useState("");
   const [recommendation2, setRecommendation2] = useState("");
   const [recommendation3, setRecommendation3] = useState("");
   const [recommendation4, setRecommendation4] = useState("");
   const [recommendation5, setRecommendation5] = useState("");
   


   //const [tokens, setTokens] = useState("");

   //disable end presentation button
   //document.getElementById("endPresentationButton").disabled = true;
   const [endButtonDisabled, setEndButtonDisabled] = useState(true);
   const [startButtonDisabled, setStartButtonDisabled] = useState(false);

   const [flagGap, setFlagGap] = useState(true);



   function changeFlagGap() {
      setFlagGap(!flagGap)
   }

   function startPresentationThreads() {
      fetch('http://localhost:5000/startPresentation', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(presentationData)
      })
         .then(resp => resp.json())
         .then((data) => {
            console.log(data)
         })
         .catch(error => console.log(error))
      console.log("can");
   }

   const presentationData = {
      "presentation_name": props.newPresentationName //todo add real name
   }

   function startPresentation() {
      //document.getElementById("startPresentationButton").disabled = true;
      //document.getElementById("endPresentationButton").disabled = false;
      setStartButtonDisabled(true);
      setEndButtonDisabled(false);
      startPresentationThreads();
      //setTimeout(getFaceDetectionFlag,2000)
      //setTimeout(getDecibel,2000)
      getFaceDetectionFlag();
      getDecibel();
      getRecommendations();
   }

   function endPresentation() {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      setFdFlag("")
      setDecibel("")
      
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
      var tempFlag = 0 
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

   /*function getTranscript() {
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
   }*/

   function getRecommendations() {
      interval4 = setInterval(async function () {
         await fetch('http://localhost:5000/getRecommendations', {
            method: 'GET',
            headers: {
               'ContentType': 'application/json',
               'Accept': 'application/json'
            },
         })
            .then(resp => resp.json())
            .then((data) => {
               console.log(data);
               setRecommendations(data);
               console.log(recommendations);
               /*if (recommendations.length > 0)
                  setRecommendation1(recommendations[0]);
               if (recommendations.length > 1);
                  setRecommendation2(recommendations[1])
               if (recommendations.length > 2)   
                  setRecommendation3(recommendations[2])
               if (recommendations.length > 3)
                  setRecommendation4(recommendations[3])
               if (recommendations.length > 4)   
                  setRecommendation5(recommendations[4])*/

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
                        <li> {recommendation1}</li>
                        <li> {recommendation2}</li>
                        <li> {recommendation3}</li>
                        <li> {recommendation4}</li>
                        <li> {recommendation5}</li>
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