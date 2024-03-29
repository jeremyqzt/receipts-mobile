import {
  domainRoot,
  receiptCreateUrl,
  receiptUpdateUrl,
  vendorUrl,
  receiptImageEditUrl,
} from "../constants/constants";
import { postData, postFormData, getData } from "./mainUtils";

export const postReceipt = async ({ image, bucket }) => {
  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  } else {
    formData.append("vendor", "Quick Entry");
    formData.append("description", "Edit Me!");
  }

  formData.append("bucket", bucket);
  formData.append("category", 1);

  const crop = { x: null, y: null, width: null, height: null };
  formData.append("crop", JSON.stringify(crop));
  formData.append("setFields", JSON.stringify({}));
  const path = `${domainRoot}${receiptCreateUrl}`;

  return postFormData(path, formData).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const updateReceipts = async (update) => {
  const data = {
    ...update,
  };
  const path = `${domainRoot}${receiptUpdateUrl}`;
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const deactivateReceipt = (rid) => {
  const data = { uid: rid };
  const path = `${domainRoot}${receiptCreateUrl}delete/`;
  return postData(path, data).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const getVendors = async () => {
  const data = {};

  const path = `${domainRoot}${vendorUrl}`;

  return getData(path, data)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => data);
};

export const addVendors = async (name) => {
  const data = {
    name,
  };

  const path = `${domainRoot}${vendorUrl}`;

  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const deleteVendor = async (uid) => {
  const data = { uid };

  const path = `${domainRoot}${vendorUrl}delete/`;

  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const postReceiptImageUpdate = async (image, uid) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("uid", uid);

  const path = `${domainRoot}${receiptImageEditUrl}`;
  return postFormData(path, formData, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};
