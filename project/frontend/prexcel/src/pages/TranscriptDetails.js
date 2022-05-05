import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";
import React, {useState} from "react";

export default function TranscriptDetails(props) {


   function goBackToPresentationDetails() {
      props.onTranscriptDetails(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }



   // const [processedTranscriptArr, setTranscriptArr] = useState([]);

   // todo
   function processTranscript() {

      console.log(props.processedTranscriptArr);

      // let transcript = props.selectedPresentations[0].transcript;

      /*let transcript = "The short story is {dragged} usually concerned with a single {dragged/} effect conveyed in only one or {repeated} a few significant episodes {repeated/} or scenes. The form {filler} encourages {filler/} economy of setting, {dragged} concise {repeated} narrative, and the {repeated/} omission of a {dragged/} complex plot; character is disclosed {/space/} in action and dramatic encounter but is seldom fully developed. Despite {/space/} its relatively limited scope, though, a short story is often judged by its ability {dragged} to provide {/space/} a “complete” or {dragged/} satisfying treatment of its characters and subject.";

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

      //console.log(processTranscriptArrTemp);

      //// todo
      //console.log(" FINAL VERSION:");
      //let processedTranscriptArr = [];
      //let tagStack2 = [];

      //processedTranscriptArr.push(processTranscriptArrTemp[0])
      //tagStack2.push(processTranscriptArrTemp[0].type);

      //let i = 0;
      //for (let currWord in processTranscriptArrTemp) {
      //   if( i !== 0){
      //      if(currWord.type === tagStack2[tagStack2.length - 1]){
      //         let str1 = " " + currWord.word;
      //         let w1 = (processedTranscriptArr[processedTranscriptArr.length - 1].word) + str1;
      //         processedTranscriptArr[processedTranscriptArr.length - 1].word = w1;
      //      }
      //      else {
      //         processedTranscriptArr.push({type: currWord.type, word: currWord.word});
      //         tagStack2.push(currWord.type);
      //      }
      //   }
      //   i = 1;
      //}
      //console.log(processedTranscriptArr);

      /*
      let indexTranscript = 0;
      let textPtr = unprocessedTranscript[indexTranscript];

      let processTranscriptArrTemp = [];

      let tagStack = [];
      tagStack.push(str_type_regular)


      while(indexTranscript < unprocessedTranscript.length){

         let nextWord = "";

         let indexTemp = indexTranscript;

         while(textPtr !== " "){
            nextWord = nextWord.concat(unprocessedTranscript[indexTemp]);
            indexTemp += 1;
            textPtr = unprocessedTranscript[indexTemp]
         }
         nextWord = nextWord.concat(" " );

         processTranscriptArrTemp.push( { type: tagStack[tagStack.length-1], word: nextWord} );
         indexTranscript += nextWord.length;
         textPtr += nextWord.length;

         console.log("nextWord: " + nextWord);


      }

      console.log(processTranscriptArrTemp);
      */

   }

// {props.selectedPresentations[0].transcript}

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

   //                   <Button variant="contained" onClick={processTranscript}>Print</Button>

   function printArr(){
      console.log(props.processedTranscriptArr);
   }

   // <Button variant="contained" onClick={printArr}>print</Button>

   return(
      <div>
         <Grid container>
            <Grid item xs={12}>
               <h2>Transcript of "{props.selectedPresentations[0].name}"</h2>
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
                     <li>You fill { (Math.round(100 * props.selectedPresentations[0].filler_ratio * 100) / 100).toFixed(2) } % of the time. </li>
                     <li>You had a gap { (Math.round(100 * props.selectedPresentations[0].gap_ratio * 100) / 100).toFixed(2) } % of the time. </li>
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

   /*return(
     <div>
     <h2>Transcript " ENG 101 " Presentation</h2>
     <p style={{textAlign: "left", marginLeft: 40 , marginTop: 30, marginBottom: 30, marginRight: 40}}> ENG 101 Lesson -33
       2 Lesson – 33 (Essay Writing)
       In the past few lessons we have looked at paragraph writing. Now we shall move forward and look at longer pieces of writing which consist of several paragraphs. The problems we considered in sentence and paragraph writing are also the fundamental problems of longer composition – the same problems of unity, coherence, and emphasis. While some topics can be treated in a single paragraph others require more elaborate development. In longer compositions we
       3 find problems of arrangement
       find problems of arrangement. A longer composition, such as an essay, divides itself usually into a number of parts. In what order shall we present them? How much emphasis should be given to each fact? These are some of the problems faced in essay writing.
       Now a lot depends on the purpose of your writing. If you are writing primarily to give information, then you need to be as exact as possible in the interest of clear, logical presentation of facts. If you are writing to describe something, or to create an image or a
       4 picture then you shall perhaps put less emphasis upon accurate measurement and more upon suggestive and revealing details. If you are writing to tell a story, you will have to decide upon the point of highest interest and arrange your material carefully to give your reader the feeling or illusion of taking part in the action.
       Writing an essay is not more difficult than writing a paragraph. There is only one difference – of length. The principles of
       5 organization are the same for both: so if you can write a good paragraph, you can also write a good essay.
       Process of Writing
       Writing usually takes place in steps or stages. There are five stages or steps in the writing process. (1) Getting ideas: brainstorming, clustering & free writing (2) making brief outline (3) writing the 1st draft (4) revising (5) proof reading
       6 .
       Process of Writing: Five stages / steps
       Getting ideas: brainstorming, clustering, free writing
       making brief outline
       writing the 1st draft
       revising
       proof reading
       7 Step I: Getting Ideas: Primarily from reading, talking to people, listening to talk shows, TV programs on current issues etc.
       (a) Brainstorming – For ideas
       jot down points or ideas and their details as they come to your mind. Just write them down without putting them in any special order. Try to accumulate as many details as you can think of. This is one strategy of beginning an essay. The other strategy is
       8 (b) Clustering: here you begin by writing your subject or topic in the center of a blank sheet of paper. Then as ideas come into your mind you put them down in boxes or circles around the subject or topic. You will now see a sample of clustering.
       (c) Free writing, this is also a very useful technique. Here you just write down whatever comes into your mind about the topic. Continue writing for sometime without stopping to worry about grammar or spellings etc.
     </p>
       <Button variant="contained" onClick={goBackToPresentationDetails}>Back To Presentation Details</Button>
     </div>
   );*/
}