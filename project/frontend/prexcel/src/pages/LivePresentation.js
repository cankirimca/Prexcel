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
   const [decibel_flag, setDecibel] = useState(0);
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
      getTranscript();
   }

   function endPresentation() {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      setFdFlag("");
      setDecibel("");
      setTranscript("");
      
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


   function FdValue(value) {
      // const trArr = props.processedTranscriptArr;

      if (value === "+") {
         return <span style={{backgroundColor: "green"}}>DETECTED </span>;
      } else if (value === "-") {
         return <span style={{backgroundColor: "red"}}>NOT DETECTED</span>;
      }
   }

   function DecibelValue(value) {
      // const trArr = props.processedTranscriptArr;

      if (value < 10) {
         return <span style={{backgroundColor: "red"}}>TOO LOW</span>;
      } else if (value < 25) {
         return <span style={{backgroundColor: "yellow"}}>LOW</span>;
      }else if (value > 60){
         return <span style={{backgroundColor: "red"}}>TOO HIGH</span>;
      }else if (value > 50){
         return <span style={{backgroundColor: "yellow"}}>HIGH</span>;
      }else{
         return <span style={{backgroundColor: "green"}}>IDEAL</span>;
      }
      
   }

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
               setTranscript(data)
            })
            .catch(error => console.log(error))
      }, 500);
   }

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
               //setRecommendations(data)
               if (data.length > 0)
                  setRecommendation1(data[0]);
               if (data.length > 1);
                  setRecommendation2(data[1])
               if (data.length > 2)   
                  setRecommendation3(data[2])
               if (data.length > 3)
                  setRecommendation4(data[3])
               if (data.length > 4)   
                  setRecommendation5(data[4])
            })
            .catch(error => console.log(error))
      }, 500);  

   }

   function goBackToMainMenu() {
      props.onLivePresentationHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   //</p> <br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> <br/><br/>
   // <p style={{marginLeft: '5%'}}> Transcript (To be removed I believe) : {transcript} </p> <br/>

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1 style={{color:'whitesmoke', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  Live Presentation for "{props.newPresentationName}"
               </h1>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={7}>

               <Paper sx={{backgroundColor: 'whitesmoke'}} align="left" elevation={3}>
                  <h3 style={{paddingTop:'2%', paddingLeft:'2%'}}> TRANSCRIPT</h3> <br/>
                  <p> {transcript}</p> <br/>

               </Paper>


            </Grid>
            <Grid item xs={3}>

               <Paper sx={{backgroundColor: 'whitesmoke'}} align="left" elevation={3}>
                  <p id = "fd-flag" style={{paddingTop: '2%', marginLeft: '5%'}}> Face Detection: {FdValue(fd_flag)}</p> <br/>
                  <p id = "decibel-flag" style={{marginLeft: '5%'}}> Current Decibel: {DecibelValue(decibel_flag)}</p> <br/>

               </Paper>

               {flagGap &&
                  <Paper style={{
                     backgroundColor: 'whitesmoke',
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
                  backgroundColor: 'whitesmoke',
                  marginTop: '1%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
               }} elevation={0}>

                  <Button disabled={startButtonDisabled} id="startPresentationButton" style={{ color:"white", margin: '1.5%'}}
                          variant="contained" onClick={startPresentation}>Start Presentation</Button>
                  <Button disabled={endButtonDisabled} id="endPresentationButton" style={{color:"white", margin: '1.5%'}}
                          variant="contained" onClick={endPresentation}>End Presentation</Button>
                  <Button style={{margin: '1.5%'}} variant="contained" onClick={goBackToMainMenu}>Back to Main
                     Menu</Button>


                  <Button style={{ margin: '1.5%'}} variant="contained" onClick={changeFlagGap}>Enable Word Recommendations</Button>


               </Paper>
            </Grid>
            <Grid item xs={2}/>

         </Grid>
      </div>

   );
};