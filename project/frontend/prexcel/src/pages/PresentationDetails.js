import * as React from 'react';
import {Card, Grid} from "@mui/material";
import ScreenIds from "./ScreenIds";
import {Button, Paper, TextField} from "@mui/material";

export default function PresentationDetails(props) {

   function goBackToMyPresentations() {
      props.onPresentationDetails(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
   }

   function goToTextTranscript() {
      props.onPresentationDetails(ScreenIds.TRANSCRIPT_DETAILS_SCREEN_ID);
   }

   return(
      <div>

         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h2>{props.selectedPresentations[0].name} Presentation </h2>
               <p>Detailed Analysis Report</p>
            </Grid>

            <Grid item xs={2}/>
            <Grid item xs={4}>
               <Card sx={{backgroundColor:'#E5E5E5', textAlign:"left", marginLeft: '5%', marginRight: '5%'}} elevation={8}>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%', marginTop:'5%'}} elevation={4}>
                     <p style={{textIndent: '2.5%' , marginTop: '4%'}}>Final Grade is : {props.selectedPresentations[0].grade}</p>
                  </Card>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%'}} elevation={4}>
                     <p style={{marginLeft: '2.5%'}}><u>Grades:</u></p>
                     <p style={{marginLeft: '2.5%'}}>Gap Ratio : {props.selectedPresentations[0].gap_ratio}</p>
                     <p style={{marginLeft: '2.5%'}}>Filler Ratio : {props.selectedPresentations[0].filler_ratio}</p>
                     <p style={{marginLeft: '2.5%'}}>Face Recognition Score : {props.selectedPresentations[0].fd_score}</p>
                  </Card>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%'}} elevation={4}>

                     <p style={{marginLeft: '2.5%'}}>Some Remarks:</p>
                  </Card>
               </Card>
            </Grid>
            <Grid item xs={4}>
               <Card sx={{backgroundColor:'#E5E5E5', textAlign:"left", marginLeft: '5%', marginRight: '5%'}} elevation={8}>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%', marginTop:'5%'}} elevation={4}>
                     <p style={{textIndent: '2.5%' , marginTop: '4%'}}>Duration : {props.selectedPresentations[0].duration} seconds</p>
                  </Card>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%'}} elevation={4}>
                     <p style={{marginLeft: '2.5%'}}><u>Speech Feedback:</u></p>
                     <p style={{marginLeft: '2.5%'}}>Percentage of Filler Words : " ?? "</p>
                     <p style={{marginLeft: '2.5%'}}>Time Spent Idle : " ?? "</p>
                     <p style={{marginLeft: '2.5%'}}>Time Spent UMM ing : " ?? "</p>
                  </Card>

                  <Card sx={{ marginLeft: '8%', marginRight: '8%', marginBottom: '8%'}} elevation={4}>

                     <p style={{marginLeft: '2.5%'}}>Word per minute (wpm) : {props.selectedPresentations[0].wpm}</p>
                  </Card>
               </Card>
            </Grid>
         </Grid>
         <Button style={{backgroundColor:'#507786', marginTop:'1.5%'}} variant="contained" onClick={goToTextTranscript}>See Text Transcript</Button><br/>
         <Button style={{backgroundColor:'#507786', marginTop:'1.5%'}}variant="contained" onClick={goBackToMyPresentations}>Back To My Presentations</Button><br/><br/><br/>
      </div>
   );
}