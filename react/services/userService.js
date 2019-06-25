import axios from "axios";
import * as serviceHelper from "./serviceHelpers";

const urlPrefix = `${serviceHelper.API_HOST_PREFIX}/api/users/`;

const add = userData => {
  const config = {
    method: "POST",
    url: `${urlPrefix}register`,
    data: userData,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

// Other co-workers content

const signIn = loginData => {
  const config = {
    method: "POST",
    url: `${urlPrefix}login`,
    data: loginData,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${urlPrefix}current`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

// Other co-workers content

const update = userInfo => {
  const config = {
    method: "PUT",
    url: `https://localhost:50001/api/users/${userInfo.id}/password`,
    withCredentials: true,
    data: userInfo,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

export {
  add,
  // Other co-workers content
  signIn,
  getCurrentUser,
  // Other co-workers content
  update
};
