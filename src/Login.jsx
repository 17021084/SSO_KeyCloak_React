import React from "react";
import configKeyCloak from "./configKeyCloak.js";
import Keycloak from "keycloak-js";
import KeyCloakServices from "./KeyCloakServices.js";

function Login() {
  // const loginSSO = async () => {
  //   try {
  //     const keycloak = new Keycloak(configKeyCloak);
  //     const res = await keycloak.init({
  //       onLoad: "login-required",
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <div>This is Public APP</div>
        <div> Internal login logic can excute here !!  </div>
      {/* <button onClick={loginSSO}>Click to go sso page</button> */}
      <button onClick={() => KeyCloakServices.doLogin()}>
        Click to go sso page
      </button>
    </div>
  );
}

export default Login;
