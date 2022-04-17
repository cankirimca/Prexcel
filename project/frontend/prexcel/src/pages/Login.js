import React, {useState, useEffect, useRef} from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

// material ui components
import {Button, Grid, Paper, TextField} from "@mui/material";

const Login = (props) => {
   const [count, setCount] = useState(0);
   useEffect(() => {
      // if successful change to main menu
      if (count != "-1" && count != "0") {
         console.log(count);
         props.onUserIdHandler(count);
         console.log("User ID : " + count + " is posted to App.js");
         props.onLoginHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
      }
      // otherwise reshow the login screen
      else {
         // todo display login failed message
         props.onLoginHandler(ScreenIds.LOGIN_SCREEN_ID);
      }
   });

   function AttemptLogin() {
      let login_username = document.getElementById('login_username')
      let login_password = document.getElementById('login_password')
      const getUser = (userData) => {
         let success = true;
         fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
         })
            .then((resp) => {
               return resp.json()
            })
            .then((data) => {
               console.log(data);
               setCount(data);
            })
            .catch(error => console.log(error))

         return success;
      };

      const userData = {
         "username": login_username.value,
         "password": login_password.value
      };

      getUser(userData);

      login_username.value = "";
      login_password.value = "";
   }

   function goToSignUp() {

      props.onLoginHandler(ScreenIds.SIGNUP_SCREEN_ID)
   }

   return (
      <Grid container spacing={2}>

         <Grid item xs={12}>
            <h1 style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>Welcome To Prexcel </h1>
         </Grid>

         <Grid item xs={4}/>
         <Grid item xs={4}>
            <Paper style={{
               backgroundColor: '#E5E5E5',
               marginTop: '50%',
               marginBottom: '5%',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'center'
            }} elevation={3}>

               <Grid style={{paddingTop: '5%'}} item xs={12}>
                  Please log-in or create an account to continue:
               </Grid>

               <Grid style={{marginTop: '5%',}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '33%', marginLeft: '32.1%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #507786", borderRadius:'5px',}} id="login_username" label="Username"
                                variant="filled"/>
                  </Paper>
               </Grid>

               <Grid style={{marginTop: '5%'}} item xs={12}>
                  <Paper sx={{backgroundColor: 'white', marginRight: '33%', marginLeft: '32.1%'}} elevation={4}>
                     <TextField sx={{width:'99%', border: "2px solid #507786", borderRadius:'5px',}} id="login_password" label="Password"
                                variant="filled"/>
                  </Paper>
               </Grid>

               <Grid style={{marginTop: '5%', paddingBottom: '5%'}} item xs={12}>
                  <Button style={{backgroundColor:'#507786', marginRight: '5%'}} variant="contained" onClick={AttemptLogin}>Log-In</Button>
                  <Button style={{backgroundColor:'#507786'}} variant="contained" onClick={goToSignUp}>Sign-Up</Button>
               </Grid>

            </Paper>
         </Grid>
         <Grid item xs={4}/>


      </Grid>
   );
};

export default Login;