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
import ChatBot from "./pages/ChatBot";

import ScreenIds from "./pages/ScreenIds";
import UserAccountDetails from "./pages/UserAccountDetails";
import NewPresentation from "./pages/NewPresentation";
import UploadRecordingScreen from "./pages/UploadRecordingScreen";
import ProgressTracking from "./pages/ProgressTracking";
import CheckCamera from "./pages/CheckCamera";
import UploadPresentationLoading from "./pages/UploadPresentationLoading";
import TutorialApp from "./pages/TutorialApp";
import TutorialPresentation from "./pages/TutorialPresentation";

function App() {

   const [processedTranscriptArr, setTranscriptArr] = useState([]);

   const [currentScreen, setCurrentScreen] = useState(ScreenIds.LOGIN_SCREEN_ID);
   const [currentUserID, setCurrentUserID] = useState(0);

   const [selectedPresentations, setSelectedPresentations] = useState([]);
   const [newPresentationName, setNewPresentationName] = useState("");

   const [uploadDone, setUploadDone] = useState(false);

   function uploadHandler(uploadDone) {
      setUploadDone(uploadDone);
   }

   function processTranscriptHandler (transcript) {
      setTranscriptArr(transcript);
   }

   function changeViewHandler(newScreenId) {
      setCurrentScreen(newScreenId);
   }

   function userIdHandler(newUserId) {
      setCurrentUserID(newUserId);
   }

   function presentationSelectionHandler(presentations) {
      setSelectedPresentations(presentations);
   }

   function newPresentationNameHandler(newPresentationName) {
      setNewPresentationName(newPresentationName);
   }

   const UIViewController = () => {
      if (currentScreen === ScreenIds.LOGIN_SCREEN_ID)
         return <Login onUserIdHandler={userIdHandler} onLoginHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.MAIN_MENU_SCREEN_ID)
         return <MainMenu onMainMenuHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.MY_PRESENTATIONS_SCREEN_ID)
         return <MyPresentations currentUserID={currentUserID} onPresentationSelection={presentationSelectionHandler} onMyPresentationsHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.LIVE_PRESENTATION_FEEDBACK_SCREEN_ID)
         return <LivePresentation newPresentationName={newPresentationName} currentUserID={currentUserID} onLivePresentationHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.PRESENTATION_DETAILS_SCREEN_ID)
         return <PresentationDetails processTranscriptHandler={processTranscriptHandler} selectedPresentations={selectedPresentations} onPresentationDetails={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.TRANSCRIPT_DETAILS_SCREEN_ID)
         return <TranscriptDetails processedTranscriptArr={processedTranscriptArr} selectedPresentations={selectedPresentations} onTranscriptDetails={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.SIGNUP_SCREEN_ID)
         return <SignUp onSignUpHandler={changeViewHandler}/>
      else if (currentScreen === ScreenIds.CHAT_BOT_SCREEN_ID)
         return <ChatBot onChatBot={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.USER_ACC_DETAILS_SCREEN_ID)
         return <UserAccountDetails onUserAccountDetailsHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.NEW_PRESENTATION_ID)
         return <NewPresentation onNewPresentationName={newPresentationNameHandler} onNewPresentationHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.UPLOAD_PRESENTATION_SCREEN_ID)
         return <UploadRecordingScreen uploadHandler={uploadHandler} newPresentationName={newPresentationName} onUploadPresentationHandler={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.PROGRESS_TRACKING_SCREEN_ID)
         return <ProgressTracking selectedPresentations={selectedPresentations} onProgressTracking={changeViewHandler}/>;
      else if (currentScreen === ScreenIds.CHECK_CAMERA)
         return <CheckCamera onCheckCameraHandler={changeViewHandler} />;
      else if (currentScreen === ScreenIds.LOADING_SCREEN)
         return <UploadPresentationLoading uploadDone={uploadDone} onPresentationLoadingHandler={changeViewHandler} />;
      else if (currentScreen === ScreenIds.TUTORIAL_APP_SCREEN_ID)
         return <TutorialApp onTutorialAppHandler={changeViewHandler} />;
      else if (currentScreen === ScreenIds.TUTORIAL_PRESENTATION_SCREEN_ID)
          return <TutorialPresentation onTutorialPresentationHandler={changeViewHandler} />;
   }


   return(
      <div className="App" style={{backgroundColor:"#2C3E50", minHeight: "102vh" }}>
         {UIViewController()}
      </div>
   );

}

export default App;