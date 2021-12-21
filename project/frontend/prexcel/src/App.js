import React from "react";

// todo remove
import logo from './logo.svg';

import './App.css';

import {
    HashRouter as Router,
    Route,
    Routes,
    Link,
    Redirect,
    // withRouter
} from "react-router-dom";

import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";

function App() {
  return (
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
  );
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
