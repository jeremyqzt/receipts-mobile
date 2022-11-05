import { domainRoot, receiptCreateUrl } from "../constants/constants";
import * as SecureStore from "expo-secure-store";

const fetchReceiptsUrl = `${domainRoot}${receiptCreateUrl}`;

export const serialize = (url, obj) => {
  const realUrl = url + "?";
  const limit = obj.limit !== undefined ? `limit=${obj.limit}&` : "";
  const offset = obj.offset !== undefined ? `offset=${obj.offset}&` : "";
  const search =
    obj.searchTerm !== undefined ? `searchTerm=${obj.searchTerm}&` : "";
  const toFetch = realUrl + limit + offset + search;
  return toFetch.substring(0, toFetch.length - 1);
};

export const getReceipts = async  (toSerialize) => {
  const path = serialize(fetchReceiptsUrl, toSerialize);
  return fetch(`${path}`, {
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
