import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Routing from "./components/Routing";
import React, { useEffect, useState } from "react";
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
function App(props) {
  const [userInfo, setUserInfo] = useState();
  const [authEvent, setAuthEvent] = useState(false);


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe5ohJkj9mZeP2lgkvGHRAjr0j2KdlsS4",
  authDomain: "fastudy-c3bad.firebaseapp.com",
  projectId: "fastudy-c3bad",
  storageBucket: "fastudy-c3bad.appspot.com",
  messagingSenderId: "840946595141",
  appId: "1:840946595141:web:47f91f2d8f9a69cd687a2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  const getUserInfo = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      //console.log(authUser.signInUserSession.idToken.jwtToken);
      setUserInfo(user);
    } catch (err) {
      console.log(err);
      setUserInfo(null);
    }
  };

  const triggerSessionValidation = () => {
    setAuthEvent((previous) => !previous);
  };

  useEffect(() => {
    try {
      getUserInfo();
    } catch (err) {
      console.log(err);
      setUserInfo(null);
    }
  }, [authEvent]);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routing userInfo={userInfo} triggerSessionValidation={triggerSessionValidation} />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
