import {
  domainRoot,
  bucketsUrl,
  activeBucketsUrl,
} from "../constants/constants";

import { postData, getData, postFormData } from "./mainUtils";

export const deactivateBucket = (bid) => {
  const data = { uid: bid };
  const path = `${domainRoot}${bucketsUrl}delete/`;
  return postData(path, data);
};

export const listBuckets = async () => {
  const data = {};
  const path = `${domainRoot}${bucketsUrl}`;
  return getData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const getActiveBucket = async () => {
  const data = {};
  const path = `${domainRoot}${activeBucketsUrl}`;
  return getData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const setActiveBucket = async (bucket) => {
  const data = { bucket };
  const path = `${domainRoot}${activeBucketsUrl}`;
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const createBucket = async (
  name,
  description,
  create_date,
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("create_date", create_date);
  formData.append("description", description);
  console.log(formData)

  const path = `${domainRoot}${bucketsUrl}`;
  return postFormData(path, formData)
    .then((res) => {
      console.log(JSON.stringify(res))
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
};
