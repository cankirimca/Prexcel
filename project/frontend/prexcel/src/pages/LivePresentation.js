import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import image from "../xyz.jpg";

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
               <Paper style={{marginTop: '5%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
                  <p> Face Detection Flag: </p> <br/>
                  {fd_flag}
               </Paper>
            </Grid>
            <Grid item xs={2}/>

            <Grid item xs={2}/>
            <Grid item xs={6}>

               <Paper sx={{height:'100%', marginTop: '1%', marginBottom:'5%'}} elevation={3}>

                  <br/><Paper sx={{height:'67%', marginRight:'5%', marginLeft:'5%',  marginTop: '5%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
                     <img src={image} style={{marginLeft:'1%', marginRight:'1%', marginTop:'1%', marginBottom:'1%', width:'95%', height:'auto'}}/><br/>
                  </Paper>

                  <Button style={{ marginLeft:'5%', marginRight:'5%', marginTop: '5%', marginBottom: '1%'}} variant="contained" onClick={startPresentation}>Start Presentation</Button>
                  <Button style={{ marginLeft:'5%', marginRight:'5%', marginTop: '5%', marginBottom: '1%'}} variant="contained" onClick={endPresentation}>End Presentation</Button>

               </Paper>
            </Grid>
            <Grid item xs={2}>
               <Paper sx={{height:'100%', marginRight:'5%', marginLeft:'5%',  marginTop: '3%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               </Paper>
            </Grid>
            <Grid item xs={2}/>

            <Grid item xs={4}/>
            <Grid item xs={4}>
               <Button style={{ marginTop: '10%', marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Back to Main Menu</Button> <br/>
            </Grid>
            <Grid item xs={4}/>
         </Grid>
      </div>

   );
};
