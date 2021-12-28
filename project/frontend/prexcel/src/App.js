
// todo remove
import logo from './logo.svg';


import {
    HashRouter as Router,
    Route,
    Routes,
    Link,
    Redirect,
    // withRouter
} from "react-router-dom";

import React, {useState} from "react";
import './App.css';
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import MyPresentations from "./pages/MyPresentations";
import PresentationDetails from "./pages/PresentationDetails";
import TranscriptDetails from "./pages/TranscriptDetails";
import SignUp from "./pages/SignUp";
import LivePresentation from "./pages/LivePresentation";

import ScreenIds from "./pages/ScreenIds";

function App() {

  const [currentScreen, setCurrentScreen] = useState(ScreenIds.LOGIN_SCREEN_ID);
  const [currentUserID, setCurrentUserID] = useState(0);

  function changeViewHandler(newScreenId) {
    setCurrentScreen(newScreenId);
  }

  function userIdHandler(newUserId) {
    setCurrentUserID(newUserId);
  }

  const UIViewController = () => {
     if (currentScreen === ScreenIds.LOGIN_SCREEN_ID)
        return <Login onUserIdHandler={userIdHandler} onLoginHandler={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.MAIN_MENU_SCREEN_ID)
        return <MainMenu onMainMenuHandler={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.MY_PRESENTATIONS_SCREEN_ID)
        return <MyPresentations currentUserID={currentUserID} onMyPresentationsHandler={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.PROCESSING_PRESENTATION_SCREEN_ID)
        return <LivePresentation currentUserID={currentUserID} onLivePresentationHandler={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.PRESENTATION_DETAILS_SCREEN_ID)
        return <PresentationDetails onPresentationDetails={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.TRANSCRIPT_DETAILS_SCREEN_ID)
        return <TranscriptDetails onTranscriptDetails={changeViewHandler}/>;
     else if (currentScreen === ScreenIds.SIGNUP_SCREEN_ID)
        return <SignUp onSignUpHandler={changeViewHandler}/>
  }

//  function navigate() {
//    if (currentScreen === 0)
//      return <Login onLoginHandler={newScreenHandler}/>;
//    else if (currentScreen === 1)
//      return <MainMenu onMainMenuHandler={newScreenHandler}/>;
//    else if (currentScreen === 2)
//      return <MyPresentations onMyPresentationsHandler={newScreenHandler}/>;
//    else if (currentScreen === 3)
//      return <PresentationDetails onPresentationDetails={newScreenHandler}/>;
//    else if (currentScreen === 4)
//      return <TranscriptDetails onTranscriptDetails={newScreenHandler}/>
//  }

  return(
    <div className="App">
      {UIViewController()}
    </div>
  );

  /*return (
     <div>
        <Router>
           <div>
              <p>
                 app.js file
              </p>
              <Link to="/login">
                 <button variant="outlined">
                    Sign up
                 </button>
              </Link>
           </div>
           <Routes>
              <Route path="/pages/Login" component={<Login />} />
              <Route path="/pages/MainMenu" component={<MainMenu />} />
           </Routes>
        </Router>
     </div>
  );*/
}

export default App;