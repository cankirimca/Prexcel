import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Grid, Paper} from "@mui/material";

const SignUp = (props) => {

   return (
      <Grid container spacing={2}>

         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h2> Sign Up To Prexcel</h2>
            <Paper style={{marginTop: '50%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
               <p> Please fill in the following information to sign-up.</p>

            </Paper>
         </Grid>
         <Grid item xs={3}/>


      </Grid>


   );
}

export default SignUp;