import {
  domainRoot,
  userDeleteUrl,
  resetPasswordUrl,
  resetPasswordForm,
  forgotPasswordUrl,
} from "../constants/constants";

import { postData } from "./mainUtils";

const LOGIN_URL = `${domainRoot}auth/token/`;

export const loginFetch = ({ username, password }) => {
  const data = { username, password };
  return fetch(LOGIN_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const SINGUP_URL = `${domainRoot}user/create/`;

export const singupFetch = ({ username, password }) => {
  const data = { username, password };
  return fetch(SINGUP_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteAccount = () => {
  const data = {};
  const path = `${domainRoot}${userDeleteUrl}`;
  return postData(path, data);
};

export const requestReset = async (username) => {
  const data = { username };
  const path = `${domainRoot}${resetPasswordUrl}`;
  return postData(path, data);
};

export const resetForm = async (username, description) => {
  const data = { username, description };
  const path = `${domainRoot}${resetPasswordForm}`;
  return postData(path, data);
};

export const forgotPassword = async (username, token, newPassword) => {
  const data = { username, token, newPassword };
  const path = `${domainRoot}${forgotPasswordUrl}`;
  return postData(path, data);
};
