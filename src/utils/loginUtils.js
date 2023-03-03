import { domainRoot, userDeleteUrl } from "../constants/constants";

import { postData } from "./mainUtils";

const LOGIN_URL = "https://api.ribbonreceipts.com/auth/token/";

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

const SINGUP_URL = "https://api.ribbonreceipts.com/user/create/";

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
