import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import KeyCloakServices from "./KeyCloakServices";

function App() {
  const [isLogin, setIsLogin] = useState();
  const checkLogin = async () => {
    try {
      const login = await KeyCloakServices.checkIsLogin();
      setIsLogin(login);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <div className="App">{isLogin ? <Home /> : <Login />}</div>;
}

export default App;
