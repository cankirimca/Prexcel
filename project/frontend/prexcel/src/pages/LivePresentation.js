import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

import {Button, Grid, Paper, TextField} from "@mui/material";


const LivePresentation = (props) => {

   function doNothing() {
      props.onMainMenuHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

    return (
        <div>
           <Grid container spacing={2}>

              <Grid item xs={12}>
                 <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                    Prexcel
                 </h1><br/>
                 <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                    The Multifunctional Presentation Assistant
                 </h1><br/>
              </Grid>

              <Grid item xs={4}/>
              <Grid item xs={4}>
                 <Paper style={{marginTop: '25%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>

                       <Button style={{ marginTop: '5%', marginBottom: '5%'}} variant="contained" onClick={doNothing}>Start Recording</Button> <br/>

                 </Paper>
              </Grid>
              <Grid item xs={4}/>
           </Grid>
        </div>

    );
};

export default MainMenu;