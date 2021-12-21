import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";

const Login = (props) => {


  function attemptLogin() {
    props.onLoginHandler(1);
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