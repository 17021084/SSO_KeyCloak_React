import React, { useState } from "react";
import axios from "axios";
import configKeyCloak from "./configKeyCloak.js";
import Keycloak from "keycloak-js";
import KeyCloakServices from "./KeyCloakServices.js";
const SERVER_PORT = 5555;

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
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = await KeyCloakServices.getToken();
      const response = await axios.get(
        `http://localhost:${SERVER_PORT}/protected`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

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
      <div>===================</div>

      <button onClick={fetchData}>fetch data</button>
      <div>Fake data</div>
      {data.map((dt, i) => (
        <div key={i}>{dt}</div>
      ))}
    </div>
  );
}

export default Protected;
