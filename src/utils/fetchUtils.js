import { domainRoot, receiptCreateUrl } from "../constants/constants";
import * as SecureStore from "expo-secure-store";

const fetchReceiptsUrl = `${domainRoot}${receiptCreateUrl}`;

export const loginFetch = async () => {
  return fetch(fetchReceiptsUrl, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `${await SecureStore.getItemAsync("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
