import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import ScreenIds from "./ScreenIds";

const MainMenu = (props) => {

  function logOut() {
     // todo discard authorization token

     props.onMainMenuHandler(ScreenIds.LOGIN_SCREEN_ID);
  }

  function goToMyPresentations() {
    props.onMainMenuHandler(ScreenIds.MY_PRESENTATIONS_SCREEN_ID);
  }

    return (
        <div>
            <p>
                main menu page
            </p>

          <button onClick={goToMyPresentations}> My Presentations</button><br/>

          <button onClick={logOut}>Log Out</button><br/><br/>
        </div>

    );
};

export default MainMenu;