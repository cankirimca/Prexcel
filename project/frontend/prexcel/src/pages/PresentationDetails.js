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
         <h2>{props.selectedPresentations[0].name} Presentation </h2>
         <p>Detailed Analysis Report</p>
         <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={4}>
               <Card sx={{backgroundColor:'#E5E5E5', minWidth: 275, maxWidth: 500, textAlign:"left", marginLeft: 5}}>
                  <p style={{textIndent: 40 , marginTop: 30}}>Final Grade is : {props.selectedPresentations[0].grade}</p>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}><u>Grades:</u></p>
                     <p style={{marginLeft: 10}}>Fluency : " ?? "</p>
                     <p style={{marginLeft: 10}}>Use of Language : " ?? "</p>
                     <p style={{marginLeft: 10}}>Body Language : " ?? "</p>
                  </Card>

                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>

                     <p style={{marginLeft: 10}}>Some Remarks: <br/>
                        ?? </p>
                  </Card>
               </Card>
            </Grid>
            <Grid item xs={4}>
               <Card sx={{backgroundColor:'#E5E5E5', minWidth: 275, maxWidth: 500, textAlign:"left", marginLeft: 5}}>
                  <p style={{textIndent: 40 , marginTop: 30}}>Duration : " ?? "</p>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}><u>Speech Feedback:</u></p>
                     <p style={{marginLeft: 10}}>Percentage of Filler Words : " ?? "</p>
                     <p style={{marginLeft: 10}}>Time Spent Idle : " ?? "</p>
                     <p style={{marginLeft: 10}}>Time Spent UMM ing : " ?? "</p>
                  </Card>

                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>

                     <p style={{marginLeft: 10}}>Video Feedback: <br/>
                        ??</p>
                  </Card>
               </Card>
            </Grid>
         </Grid>
         <br/><br/><Button variant="contained" onClick={goToTextTranscript}>See Text Transcript</Button><br/><br/>
         <Button variant="contained" onClick={goBackToMyPresentations}>Back To My Presentations</Button><br/><br/><br/>
      </div>
   );

   /*return(
      <div>
         <h2>{props.selectedPresentations[0].name} Presentation </h2>
         <p>Detailed Analysis Report</p>
         <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={4}>
               <Card sx={{ minWidth: 275, maxWidth: 500, textAlign:"left", marginLeft: 5}}>
                  <p style={{textIndent: 40 , marginTop: 30}}>Final Grade is : " 86 "</p>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}><u>Grades:</u></p>
                     <p style={{marginLeft: 10}}>Fluency : " 85 "</p>
                     <p style={{marginLeft: 10}}>Use of Language : " 86 "</p>
                     <p style={{marginLeft: 10}}>Body Language : " 87 "</p>
                  </Card>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}>Some Remarks: <br/>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                  </Card>
               </Card>
            </Grid>
            <Grid item xs={4}>
               <Card sx={{ minWidth: 275, maxWidth: 500, textAlign:"left", marginLeft: 5}}>
                  <p style={{textIndent: 40 , marginTop: 30}}>Duration : " 18.28 "</p>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}><u>Speech Feedback:</u></p>
                     <p style={{marginLeft: 10}}>Percentage of Filler Words : " 19 % "</p>
                     <p style={{marginLeft: 10}}>Time Spent Idle : " 2.11 "</p>
                     <p style={{marginLeft: 10}}>Time Spent UMM ing : " 2.14</p>
                  </Card>
                  <Card sx={{ marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                     <p style={{marginLeft: 10}}>Video Feedback: <br/>
                        When giving feedback you must always balance
                        what you want to say with what you feel will
                        be useful. Restrict your feedback to three
                        positive points and maybe one or two points
                        for development. There are only so many things
                        you can work on at the same time and it can
                        affect your motivation if you receive a list of
                        “negatives”.</p>
                  </Card>
               </Card>
            </Grid>
         </Grid>
         <br/><br/><Button variant="contained" onClick={goToTextTranscript}>See Text Transcript</Button><br/><br/>
         <Button variant="contained" onClick={goBackToMyPresentations}>Back To My Presentations</Button><br/><br/><br/>
      </div>
   );*/
}