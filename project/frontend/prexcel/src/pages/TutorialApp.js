import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";

const TutorialApp = (props) => {

   function goBackToMainMenu(){
      props.onTutorialAppHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} >
               <h1 style={{color:'whitesmoke', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"2%"}} >
                  TUTORIAL ON PREXCEL
               </h1>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
               <Paper style={{backgroundColor:'whitesmoke', padding:"5%", marginTop: '2.5%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
                  <h3>How to Use Prexcel</h3>
                  <p>text</p>
                  <h3>How Prexcel Evaluates Presentations</h3>
                  <p>text</p>
                  <h3>How Does Live Feedback Work?</h3>
                  <p>text</p>
               </Paper>

               <Button style={{ marginBottom: '5%'}} variant="contained" onClick={goBackToMainMenu}>Go Back</Button>

            </Grid>
            <Grid item xs={2}/>
         </Grid>
      </div>
   );
};

export default TutorialApp;