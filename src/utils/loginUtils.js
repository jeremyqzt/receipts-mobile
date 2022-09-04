const LOGIN_URL = "https://api.ribbonreceipts.com/auth/token/";

const loginFetch = ({ username, password }) => {
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
