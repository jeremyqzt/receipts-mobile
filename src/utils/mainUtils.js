import * as SecureStore from "expo-secure-store";

export const postData = async (url = "", data = {}) => {
  return serverCommContent(url, data, "POST", "application/json");
};

export const postFormData = async (url = "", data = {}) => {
  return serverComm(url, data, "POST", "multipart/form-data");
};

export const getData = async (url = "", data = {}) => {
  return serverCommContent(url, data, "GET", "application/json");
};

export const serverCommContent = async (
  url = "",
  data = {},
  method = "POST",
  contentType = "application/json"
) => {
  const authParam = {
    Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
  };
  const body =
    method === "POST"
      ? {
          body:
            contentType === "application/json" ? JSON.stringify(data) : data,
        }
      : {};

  return fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      ...authParam,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...body,
  });
};

export const serverComm = async (
  url = "",
  data = {},
  method = "POST",
  contentType = "application/json"
) => {
  const authParam = {
    Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
  };

  const body =
    method === "POST"
      ? {
          body:
            contentType === "application/json" ? JSON.stringify(data) : data,
        }
      : {};

  return fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...authParam,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...body,
  });
};
