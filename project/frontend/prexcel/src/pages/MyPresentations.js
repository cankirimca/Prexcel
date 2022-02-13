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
/*const rows = [
  { id: 1, name: "ENG 101", grade: 'B-', user_id: "12.00"},
  { id: 2, name: "ENG 102", grade: 'A-', user_id: "12.00"},
  { id: 3, name: "CS 102", grade: 'B', user_id: "12.00"},
  { id: 4, name: "CS 411", grade: 'S', user_id: "12.00"},
  { id: 5, name: "MSC 110", grade: 'S', user_id: "12.00"},
];*/


export default function MyPresentations(props) {

   useEffect(fetchPresentations, []);

   const [rows, setRows] = useState([]);

   function goToPresentationDetails() {
      props.onMyPresentationsHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
   }

   const [selectionModel, setSelectionModel] = useState(() => rows.filter((r) => true).map((r) => r.presentation_id));

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
         <div>
            {fetchPresentations}
         </div>
         <div style={{ height: 400, width: '100%' }}>
            <p>My Presentations</p>
            <DataGrid
               rows={rows}
               columns={columns}
               pageSize={5}
               rowsPerPageOptions={[5]}
               checkboxSelection
               disableSelectionOnClick

               selectionModel={selectionModel}
               onSelectionModelChange={setSelectionModel}
            />

            <br/><Button variant="contained" onClick={goToPresentationDetails}>Presentation Details</Button><br/><br/>
            <Button variant="contained" onClick={goBackToMainMenu}>Back To Main Menu</Button>
         </div></div>
   );
}