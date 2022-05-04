import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

const CheckCamera = (props) => {

   const [playing, setPlaying] = useState(false);


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
   }

   function stopVideo() {
      setPlaying(false);
      let video = document.getElementsByClassName("app__videoFeed")[0];
      video.srcObject.getTracks()[0].stop();
   }

   // todo
   function goToLivePresentation(){

      props.onCheckCameraHandler(ScreenIds.LIVE_FEEDBACK_SCREEN_ID);
   }


   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} >
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center', color:'white'}} >
                  Prexcel
               </h1><br/>
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center', color:'white'}} >The Multifunctional Presentation Assistant
               </h1><br/>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper sx={{marginTop: '1.7%', backgroundColor: 'lightblue'}} align="center"
                      elevation={1}>
                  <video  width='80%' muted autoPlay className="app__videoFeed"/><br/>
               </Paper>
               {playing ? (
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={stopVideo}> Stop Camera </Button>) : (
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={startVideo}> Start Camera </Button>)}

               {playing &&
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={goToLivePresentation}>Continue To Presentation</Button>}

            </Grid>
            <Grid item xs={2}/>
         </Grid>
      </div>
   );
};

export default CheckCamera;