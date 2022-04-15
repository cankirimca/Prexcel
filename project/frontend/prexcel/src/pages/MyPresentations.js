import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";

// todo to be removed once connected to the database
const columns = [
   {
      field: 'id',
      headerName: 'ID',
      width: 90
   },
   {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
   },
   {
      field: 'transcript',
      headerName: 'Transcript',
      type: 'number',
      width: 110,
      editable: true,
   },
   {
      field: 'user_id',
      headerName: 'UserID',
      type: 'number',
      width: 110,
      editable: true,
   },
];

// todo to be removed once connected to the database
// const rows = [
//    { id: 1, name: "ENG 101", transcript: "ENG 101 Lesson -33\n" +
//          "      2 Lesson – 33 (Essay Writing)\n" +
//          "      In the past few lessons we have looked at paragraph writing. Now we shall move forward and look at longer pieces of writing which consist of several paragraphs. The problems we considered in sentence and paragraph writing are also the fundamental problems of longer composition – the same problems of unity, coherence, and emphasis. While some topics can be treated in a single paragraph others require more elaborate development. In longer compositions we\n" +
//          "\n" +
//          "      3 find problems of arrangement\n" +
//          "      find problems of arrangement. A longer composition, such as an essay, divides itself usually into a number of parts. In what order shall we present them? How much emphasis should be given to each fact? These are some of the problems faced in essay writing.\n" +
//          "      Now a lot depends on the purpose of your writing. If you are writing primarily to give information, then you need to be as exact as possible in the interest of clear, logical presentation of facts. If you are writing to describe something, or to create an image or a\n" +
//          "\n" +
//          "      4 picture then you shall perhaps put less emphasis upon accurate measurement and more upon suggestive and revealing details. If you are writing to tell a story, you will have to decide upon the point of highest interest and arrange your material carefully to give your reader the feeling or illusion of taking part in the action.\n" +
//          "      Writing an essay is not more difficult than writing a paragraph. There is only one difference – of length. The principles of\n" +
//          "\n" +
//          "      5 organization are the same for both: so if you can write a good paragraph, you can also write a good essay.\n" +
//          "      Process of Writing\n" +
//          "      Writing usually takes place in steps or stages. There are five stages or steps in the writing process. (1) Getting ideas: brainstorming, clustering & free writing (2) making brief outline (3) writing the 1st draft (4) revising (5) proof reading\n" +
//          "\n" +
//          "      6 .\n" +
//          "      Process of Writing: Five stages / steps\n" +
//          "      Getting ideas: brainstorming, clustering, free writing\n" +
//          "      making brief outline\n" +
//          "      writing the 1st draft\n" +
//          "      revising\n" +
//          "      proof reading\n" +
//          "\n" +
//          "      7 Step I: Getting Ideas: Primarily from reading, talking to people, listening to talk shows, TV programs on current issues etc.\n" +
//          "      (a) Brainstorming – For ideas\n" +
//          "      jot down points or ideas and their details as they come to your mind. Just write them down without putting them in any special order. Try to accumulate as many details as you can think of. This is one strategy of beginning an essay. The other strategy is\n" +
//          "\n" +
//          "      8 (b) Clustering: here you begin by writing your subject or topic in the center of a blank sheet of paper. Then as ideas come into your mind you put them down in boxes or circles around the subject or topic. You will now see a sample of clustering.\n" +
//          "      (c) Free writing, this is also a very useful technique. Here you just write down whatever comes into your mind about the topic. Continue writing for sometime without stopping to worry about grammar or spellings etc.", grade: 'B-', user_id: "12"},
//    { id: 2, name: "ENG 102", transcript: "Transcript eng \n detailssssssss" , grade: 'A-', user_id: "12"},
//    { id: 3, name: "CS 102", transcript: "Transcript cs102 \n detailsssssssss" , grade: 'B', user_id: "12"},
//    { id: 4, name: "CS 411", transcript: "Transcript cs411  \n detailssssssss" , grade: 'S', user_id: "12"},
//    { id: 5, name: "MSC 110", transcript: "Transcript msc110 \n detailssssssss" , grade: 'S', user_id: "12"},
//    { id: 6, name: "GE 301", transcript: "Transcript ge301 \n detailssssssss" , grade: 'S-', user_id: "12"},
// ];


export default function MyPresentations(props) {

   useEffect(fetchPresentations, []);

   /* IMPORTANT !!
   THIS HOOK TO BE USED FOR ACTUAL DB CONNECTION
    */
   const [rows, setRows] = useState([]);

   function goToPresentationDetails() {
      props.onMyPresentationsHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   /* DO NOT OPEN BELOW COMMENT */
   //const [selectionModel, setSelectionModel] = useState(() => rows.filter((r) => true).map((r) => r.presentation_id));
   const [selectedRows, setSelectedRows] = useState([]);

   function goBackToMainMenu() {
      props.onMyPresentationsHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   function fetchPresentations() {
      getPresentations(userData);
   }

   const getPresentations = (userID) => {
      let success = true;
      fetch('http://localhost:5000/getPresentations', {
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body:JSON.stringify(userID)
      })
         .then((resp) => {
            return resp.json()
         })
         .then((data) => {
            console.log(data);
            setRows(fixData(data));
            console.log(rows);
         })
         .catch(error => console.log(error))

      return success;
   };

   const userData = {
      "userID": props.currentUserID
   };

   function fixData (arr2d) {

      let fixedRows = [];

      for (let i = 0; i < arr2d.length; i++) {
         let newObj = {};
         newObj.id = arr2d[i][0];
         newObj.name = arr2d[i][1];
         newObj.transcript = arr2d[i][2];
         newObj.user_id = arr2d[i][3];
         fixedRows.push(newObj);
      }
      return fixedRows;
   }

   return (
      <div>
         {fetchPresentations}
         <Grid item xs={12}>
            <h1>My Presentations</h1>
         </Grid>
         <Grid container spacing={2}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
               <Paper sx={{backgroundColor:'#E5E5E5', height:400, marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={3}>
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     pageSize={5}
                     rowsPerPageOptions={[5]}
                     checkboxSelection
                     disableSelectionOnClick

                     //selectionModel={selectionModel}
                     onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = rows.filter((row) =>
                           selectedIDs.has(row.id),
                        );

                        setSelectedRows(selectedRows);}}
                  />
                  {console.log(JSON.stringify(selectedRows, null, 4))}
                  <br/>
                  <Button disabled={!(selectedRows.length === 1)} variant="contained" onClick={goToPresentationDetails}>View Report</Button><br/><br/>
                  <Button disabled={!(selectedRows.length >= 2)} variant="contained">See Progress</Button><br/><br/>
                  <Button variant="contained" onClick={goBackToMainMenu}>Back To Main Menu</Button>
               </Paper>
            </Grid>
            <Grid item xs={3}/>
         </Grid>
         {props.onPresentationSelection(selectedRows)}
      </div>
   );
}