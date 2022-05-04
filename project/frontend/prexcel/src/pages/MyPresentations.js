import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";

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
];

export default function MyPresentations(props) {

   useEffect(fetchPresentations, []);

   /* IMPORTANT !!
   THIS HOOK TO BE USED FOR ACTUAL DB CONNECTION
    */
   const [rows, setRows] = useState([]);

   function goToPresentationDetails() {
      props.onMyPresentationsHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   function goToProgressTracking() {
      props.onMyPresentationsHandler(ScreenIds.PROGRESS_TRACKING_SCREEN_ID);
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
         newObj.wpm = arr2d[i][4];
         newObj.duration = arr2d[i][5];
         newObj.filler_ratio = arr2d[i][6];
         newObj.word_count = arr2d[i][7];
         newObj.gap_ratio = arr2d[i][8];
         newObj.fd_score = arr2d[i][9];
         newObj.grade = arr2d[i][10];
         newObj.dragged_ratio = arr2d[i][11];
         newObj.repeated_ratio = arr2d[i][12];
         newObj.p_date = arr2d[i][13];

         fixedRows.push(newObj);
      }
      return fixedRows;
   }

   return (
      <div>
         {fetchPresentations}
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1>My Presentations</h1>
            </Grid>

            <Grid item xs={3}/>
            <Grid item xs={6}>
               <Paper sx={{backgroundColor:'whitesmoke', height:400, marginTop: '2.5%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'}} elevation={8}>
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
               </Paper>
               <Paper sx={{marginRight:'25%', marginLeft:'25%', backgroundColor:'whitesmoke'}} elevation={8}>
                  <Button disabled={!(selectedRows.length === 1)} variant="contained" onClick={goToPresentationDetails}>View Report</Button><br/><br/>
                  <Button  disabled={!(selectedRows.length >= 2)} variant="contained" onClick={goToProgressTracking}>See Progress</Button><br/><br/>
                  <Button data-testid="my_presentations_go_back" style={{marginBottom:'5%', color:"white"}} variant="contained" onClick={goBackToMainMenu}>Back To Main Menu</Button>
               </Paper>
            </Grid>
            <Grid item xs={3}/>
         </Grid>
         {props.onPresentationSelection(selectedRows)}
      </div>
   );
}