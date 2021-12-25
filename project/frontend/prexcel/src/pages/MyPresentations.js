import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from "react";
import ScreenIds from "./ScreenIds";

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
    field: 'grade',
    headerName: 'Grade',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    type: 'number',
    width: 110,
    editable: true,
  },
];

// todo to be removed once connected to the database
const rows = [
  { id: 1, name: "ENG 101", grade: 'B-', duration: "12.00"},
  { id: 2, name: "ENG 102", grade: 'A-', duration: "12.00"},
  { id: 3, name: "CS 102", grade: 'B', duration: "12.00"},
  { id: 4, name: "CS 411", grade: 'S', duration: "12.00"},
  { id: 5, name: "MSC 110", grade: 'S', duration: "12.00"},
];

export default function MyPresentations(props) {

  function goToPresentationDetails() {
    props.onMyPresentationsHandler(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
  }

  const [selectionModel, setSelectionModel] = useState(() => rows.filter((r) => true).map((r) => r.id));

  function goBackToMainMenu() {
    props.onMyPresentationsHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
  }

  return (
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

      <br/><button onClick={goToPresentationDetails}>Presentation Details</button><br/><br/>
      <button onClick={goBackToMainMenu}>Back To Main Menu</button>
    </div>
  );
}