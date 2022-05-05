import {Button, Grid, Paper} from "@mui/material";
import ScreenIds from "./ScreenIds";
import * as React from "react";
import { Chart, registerables } from 'chart.js';

import {Line} from 'react-chartjs-2';

export default function ProgressTracking(props) {

   Chart.register(...registerables);

   function formData(objArr, dataType) {
      let data = [];
      for (const obj of objArr) {
         data.push(returnDataObj(obj, dataType));
      }
      return data;
   }

   function returnDataObj(obj, dataType) {
      if (dataType === "name")
         return obj.name;
      else if (dataType === "fd_score")
         return obj.fd_score;
      else if (dataType === "grade")
         return (Math.round(100 * obj.grade * 100) / 100).toFixed(2);
      else if (dataType === "gap")
         return (Math.round(100 * (1 - obj.gap_ratio) * 100) / 100).toFixed(2);
      else if (dataType === "filler")
         return (Math.round(100 * (1 - obj.filler_ratio) * 100) / 100).toFixed(2);
   }

   const state = {
      labels: formData(props.selectedPresentations, "name"),
      datasets: [
         {
            label: 'Final Grade',
            fill: false,
            lineTension: 0,
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 2,
            data: formData(props.selectedPresentations, "grade")
         },
         {
            label: 'Face Detection Score',
            fill: false,
            lineTension: 0,
            backgroundColor: '#0d98ba',
            borderColor: '#0d98ba',
            borderWidth: 2,
            data: formData(props.selectedPresentations, "fd_score")
         },
         {
            label: 'Gap Score',
            fill: false,
            lineTension: 0,
            backgroundColor: '#56358a',
            borderColor: '#56358a',
            borderWidth: 2,
            data: formData(props.selectedPresentations, "gap")
         },
         {
            label: 'Filler Score',
            fill: false,
            lineTension: 0,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 2,
            data: formData(props.selectedPresentations, "filler")
         }
      ]
   }

   function goToMyPresentations() {
      props.onProgressTracking(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
   }

   function PresentationInstance(pName, pDate) {

      return <li>  <p> {pName}  -  {pDate} </p> </li>;
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1 style={{color:'whitesmoke'}}>Progress Tracking</h1>
            </Grid>

            <Grid item xs={1}/>
            <Grid item xs={7}>

               <Paper sx={{backgroundColor:'#E5E5E5', padding:'3%'}} elevation={8}>
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
            <Grid item xs={3}>
               <Paper sx={{backgroundColor:'#E5E5E5', padding:'1%'}} elevation={8}>
                  <ul align="left">
                     { (props.selectedPresentations).map(item => (
                        PresentationInstance(item.name, new Date(String(item.p_date)).toDateString() )))
                     }
                  </ul>
               </Paper>

            </Grid>
            <Grid item xs={1}/>

         </Grid>
      </div>
   );
}