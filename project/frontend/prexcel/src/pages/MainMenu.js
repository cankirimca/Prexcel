import React, { useState, useEffect, useRef } from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";

const MainMenu = (props) => {

  function logOut() {
    props.onMainMenuHandler(0);
  }

  function goToMyPresentations() {
    props.onMainMenuHandler(2);
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