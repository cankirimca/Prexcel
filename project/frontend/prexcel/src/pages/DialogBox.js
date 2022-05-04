import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";


export default function DialogBox(props) {

   return (

      <div>
         <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{backgroundColor: 'whitesmoke'}} id="alert-dialog-title">
               {props.dialogTitle}
            </DialogTitle>
            <DialogContent sx={{backgroundColor: 'whitesmoke'}}>
               <DialogContentText id="alert-dialog-description">
                  {props.dialogContent}
               </DialogContentText>
            </DialogContent>
            <DialogActions sx={{backgroundColor: 'whitesmoke'}}>
               <Button  onClick={props.onClose} autoFocus>
                  Go Back
               </Button>
            </DialogActions>
         </Dialog>
      </div>

   );
}