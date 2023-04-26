import React, { useState } from "react";
import axios from "axios";
import configKeyCloak from "./configKeyCloak.js";
import Keycloak from "keycloak-js";
import KeyCloakServices from "./KeyCloakServices.js";

function Protected() {
  // const logoutFn = async () => {
  //   try {
  //     const client = new Keycloak(configKeyCloak);
  //     await client.logout({
  //       redirectUri: "http://localhost:3000/login",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [token, setToken] = useState();

  return (
    <div>
      <div>Protected page</div>

      <div>
        <button
          onClick={() => {
            KeyCloakServices.doLogout();
          }}
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => {
          setToken(KeyCloakServices.getToken());
        }}
      >
        get token
      </button>
      <div>token here:</div>
      <div>{token}</div>
    </div>
  );
}

export default Protected;
