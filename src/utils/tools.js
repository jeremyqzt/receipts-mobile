import { decode as atob } from "base-64";

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return {};
  }
};
