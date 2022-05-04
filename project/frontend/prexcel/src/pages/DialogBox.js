import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";


export default function DialogBox(props) {

   return (

      <div>
         <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{backgroundColor: '#F5F5F5'}} id="alert-dialog-title">
               {props.dialogTitle}
            </DialogTitle>
            <DialogContent sx={{backgroundColor: '#F5F5F5'}}>
               <DialogContentText id="alert-dialog-description">
                  {props.dialogContent}
               </DialogContentText>
            </DialogContent>
            <DialogActions sx={{backgroundColor: '#F5F5F5'}}>
               <Button sx={{color:'#507786',}} onClick={props.onClose} autoFocus>
                  Go Back
               </Button>
            </DialogActions>
         </Dialog>
      </div>

   );
}