import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";
import DialogBox from "./DialogBox";



const addUser = (newUser) => {
   fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
         'Content-Type':'application/json'
      },
      body:JSON.stringify(newUser)
   })
   .then(resp => resp.json())
   .then((data) => {
      console.log(data)
   })
   .catch(error => console.log(error))
   console.log("can");
};

const SignUp = (props) => {

   const [dialogContent, setDialogContent] = useState("Sign Up");
   const [dialogTitle, setDialogTitle] = useState("Sign Up");

   const [dialogOpen, setDialogOpen] = useState(false);
   const handleClose = () => {
      setDialogOpen(false);
   };

   function attemptSignup() {

      const username = document.getElementById('register_username')
      const email = document.getElementById('register_email')
      const password = document.getElementById('register_password')
      const password2 = document.getElementById('register_password_2')

      // todo check login credentials
      let signUpSuccessful = true;

      if (password.value !== password2.value) {
         signUpSuccessful = false;
         setDialogTitle("Passwords do not match!");
         setDialogContent("Please re-enter your passwords.")
         setDialogOpen(true);
      }
      else if (username.value === "" || email.value === "" || password.value === "" || password2.value === "") {
         signUpSuccessful = false;
         setDialogTitle("Some fields are empty!");
         setDialogContent("Please fill the empty field or fields.");
      }

      const newData = {
         "username": username.value,
         "email": email.value,
         "password": password.value
      };

      if (signUpSuccessful)
         addUser(newData);


      // TODO we are doing something completely different here...
      // if successful change to main menu
      if ( signUpSuccessful){
         props.onSignUpHandler(ScreenIds.LOGIN_SCREEN_ID);
      }

      // otherwise reshow the login screen
      else {
         setDialogOpen(true);

      }
   }

   function goToLogin() {

      props.onSignUpHandler(ScreenIds.LOGIN_SCREEN_ID)
   }

   return (
      <Grid container spacing={2}>

         <Grid item xs={3}/>
         <Grid item xs={6}>
            <h1 style={{color:'whitesmoke'}}> Sign Up To Prexcel</h1>
            <Paper style={{marginTop: '20%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: 'whitesmoke'}} elevation={8}>
               <p style={{paddingTop: '5%'}}> Please fill in the following information to sign-up.</p>

               <Grid style={{ marginTop: '5%', marginBottom: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '36%', marginLeft: '36%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #2c778f", borderRadius:'5px',}} data-testid="register_username_id" id="register_username" label="Username" variant="filled" required/>
                  </Paper>
               </Grid>
               <Grid style={{ marginTop: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '36%', marginLeft: '36%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #2c778f", borderRadius:'5px',}} data-testid="register_email_id" id="register_email" label="Email" variant="filled" required/>
                  </Paper>
               </Grid>
               <Grid style={{ marginTop: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '36%', marginLeft: '36%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #2c778f", borderRadius:'5px',}} type="password" data-testid="register_password_id_1" id="register_password" label="Password" variant="filled" required/>
                  </Paper>
               </Grid>
               <Grid style={{ marginTop: '5%', marginBottom: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '36%', marginLeft: '36%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #2c778f", borderRadius:'5px',}} type="password" data-testid="register_password_id_2" id="register_password_2" label="Confirm Password" variant="filled" required/>
                  </Paper>
               </Grid>
               <Grid style={{ marginTop: '5%', paddingBottom:'5%'}} item xs={12}>
                  <Button data-testid="signup_button_id" style={{ marginRight: '5%'}} variant="contained" onClick={attemptSignup}>SignUp</Button>
                  <Button data-testid="cancel_button_id" variant="contained" onClick={goToLogin}>Cancel</Button>
                  <DialogBox data-testid="signup_error_message_id" open={dialogOpen} onClose={handleClose}
                             dialogContent={dialogContent}
                             dialogTitle={dialogTitle}/>
               </Grid>
            </Paper>



         </Grid>
         <Grid item xs={3}/>



      </Grid>


   );
}

export default SignUp;