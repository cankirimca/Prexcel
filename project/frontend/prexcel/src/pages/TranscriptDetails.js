import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";
import React, {useState} from "react";

export default function TranscriptDetails(props) {


   function goBackToPresentationDetails() {
      props.onTranscriptDetails(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   // const [processedTranscriptArr, setTranscriptArr] = useState([]);

   // now obsolete
   function processTranscript() {

      console.log(props.processedTranscriptArr);


   }


   const str_type_regular = 0;
   const str_type_filler = 1;
   const str_type_gap = 2;
   const str_type_repeated = 3;
   const str_type_dragged = 4;

   function TranscriptDisplay(typeOfWord, word) {
      // const trArr = props.processedTranscriptArr;

      if (typeOfWord === str_type_regular) { // regular white
         return <span style={{backgroundColor: "#FFFFFF"}}>{word} </span>;
      } else if (typeOfWord === str_type_filler) { // filler yellow
         return <span style={{backgroundColor: "#FFFF00"}}>{word} </span>;
      } else if (typeOfWord === str_type_gap) { // gap red
         return <span style={{backgroundColor: "#FF0000"}}> {word} </span>;
      } else if (typeOfWord === str_type_repeated) { // repeated green
         return <span style={{backgroundColor: "#00FF00"}}>{word} </span>;
      } else if (typeOfWord === str_type_dragged) { // dragged blue
         return <span style={{ backgroundColor:"#4fc3f7"}}>{word} </span>
      }
   }

   // <Button variant="contained" onClick={processTranscript}>Print</Button>

   function printArr(){
      console.log(props.processedTranscriptArr);
   }

   // <Button variant="contained" onClick={printArr}>print</Button>

   return(
      <div>
         <Grid container>
            <Grid item xs={12}>
               <h2 style={{color:'whitesmoke'}}>Transcript of "{props.selectedPresentations[0].name}"</h2>
            </Grid>

            <Grid item xs={7} style={{ marginTop: '1.65%', marginLeft: '2%'}}>

               <Paper elevation={3} style={{ padding:'2%'}}>
                     { (props.processedTranscriptArr).map(item => (
                        TranscriptDisplay(item.type, item.word)))
                     }
               </Paper>

            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={4} style={{ marginLeft: '-4%'}}>
               <Paper elevation={3} style={{ margin: '5%', paddingBottom:'1%'}}>
                  Legend
                  <ul align="left">
                     <li> <p> <span style={{ backgroundColor:"#FFFFFF"}}> Regular text </span>  </p> </li>
                     <li> <p> <span style={{ backgroundColor:"#4fc3f7"}}> Dragged </span>  </p> </li>
                     <li> <p> <span style={{ backgroundColor:"#00FF00"}}> Repeated </span>  </p> </li>
                     <li> <p> <span style={{ backgroundColor:"#FFFF00"}}> Filler </span>  </p> </li>
                     <li> <p> <span style={{ backgroundColor:"#FF0000"}}> Big gap </span> </p> </li>
                  </ul>
               </Paper>
               <Paper elevation={3} style={{ margin: '5%', paddingBottom:'1%'}}>
                  Statistics
                  <ul align="left">
                     <li>You dragged { (Math.round(100 * props.selectedPresentations[0].dragged_ratio * 100) / 100).toFixed(2) } % of the time. </li>
                     <li>You filled time { (Math.round(100 * props.selectedPresentations[0].filler_ratio * 100) / 100).toFixed(2) } % of the time. </li>
                     <li>You were silent { (Math.round(100 * props.selectedPresentations[0].gap_ratio * 100) / 100).toFixed(2) } % of the time. </li>
                  </ul>
               </Paper>
            </Grid>

            <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
               <Button variant="contained" onClick={goBackToPresentationDetails}>Back To Presentation Details</Button>

            </Grid>
            <Grid item xs={4}/>


         </Grid>

      </div>
   );
}