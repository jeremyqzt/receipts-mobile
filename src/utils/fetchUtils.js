import { domainRoot, receiptCreateUrl } from "../constants/constants";
import * as SecureStore from "expo-secure-store";

const fetchReceiptsUrl = `${domainRoot}${receiptCreateUrl}`;

export const getReceipts = async (off) => {
  return fetch(`${fetchReceiptsUrl}?sort=0&offset=${off}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
