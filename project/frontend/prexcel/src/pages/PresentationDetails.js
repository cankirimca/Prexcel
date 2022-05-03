import * as React from 'react';
import {Card, Grid} from "@mui/material";
import ScreenIds from "./ScreenIds";
import {Button, Paper, TextField} from "@mui/material";
import {useState} from "react";

export default function PresentationDetails(props) {

   function goBackToMyPresentations() {
      props.onPresentationDetails(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
   }

   const str_type_regular = 0;
   const str_type_filler = 1;
   const str_type_gap = 2;
   const str_type_repeated = 3;
   const str_type_dragged = 4;

   const [processedTranscriptArr, setTranscriptArr] = useState([]);

   function goToTextTranscript() {
      // let transcript = props.selectedPresentations[0].transcript;

      let transcript = "The short story is {dragged} usually concerned with a single {dragged/} effect conveyed in only one or {repeated} a few significant episodes {repeated/} or scenes. The form {filler} encourages {filler/} economy of setting, {dragged} concise {repeated} narrative, and the {repeated/} omission of a {dragged/} complex plot; character is disclosed {/space/} in action and dramatic encounter but is seldom fully developed. Despite {/space/} its relatively limited scope, though, a short story is often judged by its ability {dragged} to provide {/space/} a “complete” or {dragged/} satisfying treatment of its characters and subject.";

      let transcriptTokens = transcript.split(" ");

      let processTranscriptArrTemp = [];
      let tagStack = [];

      tagStack.push(str_type_regular);

      for (let i = 0; i < transcriptTokens.length; i++) {
         // console.log("i:" + transcriptTokens[i]);
         let token = transcriptTokens[i];
         if( token !== ""){
            if(token === "{dragged}"){
               tagStack.push(str_type_dragged);
            }
            else if (token === "{dragged/}"){
               tagStack.pop();
            }
            else if(token === "{filler}"){
               tagStack.push(str_type_filler);
            }
            else if (token === "{filler/}"){
               tagStack.pop();
            }
            else if(token === "{repeated}"){
               tagStack.push(str_type_repeated);
            }
            else if (token === "{repeated/}"){
               tagStack.pop();
            }
            // todo check
            else if (token === "{/space/}"){
               transcriptTokens[i] = "(...)";
            }
            // console.log("TRANSCRIPT TOKEN:" + transcriptTokens[i]);

            // push into the array
            if( transcriptTokens[i] === "(...)" || transcriptTokens[i][0] !== "{"){
               if( transcriptTokens[i] !== "(...)"){
                  processTranscriptArrTemp.push( { type: tagStack[tagStack.length-1], word: transcriptTokens[i]} );
               }
               else {
                  processTranscriptArrTemp.push( { type: str_type_gap, word: transcriptTokens[i]} );
               }
            }
         }
      }

      console.log(processTranscriptArrTemp);
      setTranscriptArr(processTranscriptArrTemp);
      // variable: processTranscriptArrTemp
      // hook: processedTranscriptArr, setTranscriptArr

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