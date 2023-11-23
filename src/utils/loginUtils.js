import {
  domainRoot,
  userDeleteUrl,
  resetPasswordUrl,
  resetPasswordForm,
  forgotPasswordUrl,
  mfaUrl,
  mfaVerifyUrl,
  mfaLogin,
  mfaDisable,
} from "../constants/constants";

import { postData, getData } from "./mainUtils";

const LOGIN_V2_URL = `${domainRoot}v2/auth/token/`

export const loginFetch = ({ username, password }) => {
  const data = { username, password };
  return fetch(LOGIN_V2_URL, {
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
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();

  });
};

export const resetForm = async (username, description = "") => {
  const data = { username, description };
  const path = `${domainRoot}${resetPasswordForm}`;
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const forgotPassword = async (username, token, newPassword) => {
  const data = { username, token, newPassword };
  const path = `${domainRoot}${forgotPasswordUrl}`;
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const createMfa = async () => {
  const data = {};
  const path = `${domainRoot}${mfaUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const isMfaEnabled = async () => {
  const data = {};
  const path = `${domainRoot}${mfaUrl}`;
  return getData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const verifyMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaVerifyUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};


export const disableMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaDisable}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};


export const logInMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaLogin}`;
  return postData(path, data, true);
};
