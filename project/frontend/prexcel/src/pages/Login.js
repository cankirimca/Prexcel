import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";


const Login = (props) => {


  function attemptLogin() {

     // todo check login credentials
     let loginSuccessful = true;

     // if successful change to main menu
     if ( loginSuccessful){
        props.onLoginHandler(ScreenIds.MAIN_MENU_SCREEN_ID);
     }
     // otherwise reshow the login screen
     else {
        // todo display login failed message

        props.onLoginHandler(ScreenIds.LOGIN_SCREEN_ID);
     }
  }

    return (
        <div>
            <p>
                login page
            </p>


          <button onClick={attemptLogin}>Login</button><br/><br/>

        </div>

    );
};

export default Login;