import {Button, Grid, Paper} from "@mui/material";
import ScreenIds from "./ScreenIds";
import * as React from "react";
import { Chart, registerables } from 'chart.js';

import {Line} from 'react-chartjs-2';

export default function ProgressTracking(props) {

   Chart.register(...registerables);

   function formLabels(objArr) {
      let labels = [];
      for (const obj of objArr) {
         labels.push(obj.name);
      }
      return labels;
   }

   const state = {
      labels: formLabels(props.selectedPresentations),
      datasets: [
         {
            label: 'Final Grade',
            fill: false,
            lineTension: 0,
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
         },
         {
            label: 'Grade 1',
            fill: false,
            lineTension: 0,
            backgroundColor: '#0d98ba',
            borderColor: '#0d98ba',
            borderWidth: 2,
            data: [32, 78, 25, 76, 38]
         },
         {
            label: 'Grade 2',
            fill: false,
            lineTension: 0,
            backgroundColor: '#56358a',
            borderColor: '#56358a',
            borderWidth: 2,
            data: [64, 28, 75, 35, 91]
         }
      ]
   }

   function goToMyPresentations() {
      props.onProgressTracking(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1>Progress Tracking</h1>
            </Grid>

            <Grid item xs={3}/>
            <Grid item xs={6}>

               <Paper sx={{backgroundColor:'#E5E5E5'}} elevation={8}>
                  <Line
                     data={state}
                     options={{
                        title:{
                           display:true,
                           text:'Average Rainfall per month',
                           fontSize:20
                        },
                        legend:{
                           display:true,
                           position:'right'
                        }
                     }}
                  />
               </Paper>

               <Button variant="contained" onClick={goToMyPresentations}>Back</Button>

            </Grid>
            <Grid item xs={3}/>

         </Grid>
      </div>
   );
}