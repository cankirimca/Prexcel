import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from "react";

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

const rows = [
  { id: 1, name: "ENG 101", grade: 'B-', duration: "12.00"},
  { id: 2, name: "ENG 102", grade: 'A-', duration: "12.00"},
  { id: 3, name: "CS 102", grade: 'B', duration: "12.00"},
  { id: 4, name: "CS 411", grade: 'S', duration: "12.00"},
  { id: 5, name: "MSC 110", grade: 'S', duration: "12.00"},
];

export default function MyPresentations() {

  const [selectionModel, setSelectionModel] = useState(() => rows.filter((r) => true).map((r) => r.id));

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
    </div>
  );
}