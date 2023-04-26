import Keycloak from "keycloak-js";
import configKeyCloak from "./configKeyCloak";

const _kc = new Keycloak(configKeyCloak);

const initKeycloak = () => {
  // onAuthenticatedCallback();
  return _kc.init({
    // onLoad: 'login-required',
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
  });
};

const checkIsLogin = () => {
  return new Promise((resolve, reject) => {
    _kc
      .init({
        // onLoad: 'login-required',
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
      })
      .then((authenticated) => {
        console.log("authenticate", authenticated);
        resolve(authenticated);
      })
      .catch((error) => {
        reject(error);
      });
  });

  // _kc
  //   .init({
  //     // onLoad: 'login-required',
  //     onLoad: "check-sso",
  //     silentCheckSsoRedirectUri:
  //       window.location.origin + "/silent-check-sso.html",
  //     pkceMethod: "S256",
  //   })
  // .then((authenticated) => {
  //   console.log("authenticate",authenticated)
  //   return authenticated;
  // })
  // .catch((error) => {
  //   console.log(error);
  //   return false;
  // });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const KeyCloakServices = {
  doLogin,
  doLogout,
  getToken,
  initKeycloak,
  checkIsLogin,
};

export default KeyCloakServices;
