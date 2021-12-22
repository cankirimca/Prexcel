
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

function App() {

  const [currentScreen, setCurrentScreen] = useState(0);

  function newScreenHandler(newScreen) {
    setCurrentScreen(newScreen);
  }

  function navigate() {
    if (currentScreen === 0)
      return <Login onLoginHandler={newScreenHandler}/>;
    else if (currentScreen === 1)
      return <MainMenu onMainMenuHandler={newScreenHandler}/>;
    else if (currentScreen === 2)
      return <MyPresentations onMyPresentationsHandler={newScreenHandler}/>;
  }

  return(
    <div className="App">
      {navigate()}
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

//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Text text text
//         </p>
//         <a
//           className="App-link"
//           href=""
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           hyperlink hyperlink hyperlink mahmut
//         </a>
//       </header>
//     </div>
