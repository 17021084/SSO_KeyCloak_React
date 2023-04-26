import React from "react";
import Keycloak from "keycloak-js";
import configKeyCloak from "./configKeyCloak.js";

const client = new Keycloak(configKeyCloak);

const useAuth = () => {
  const [isLogin, setLogin] = React.useState(false);
  React.useEffect(() => {
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.error("err", err));
  }, []);

  return isLogin;
};

export default useAuth;
