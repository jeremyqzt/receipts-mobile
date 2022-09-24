import {
  domainRoot,
  receiptCreateUrl,
  receiptUpdateUrl,
} from "../constants/constants";
import { postData, postFormData } from "./mainUtils";

export const postReceipt = async ({
  image,
  bucket,
  description,
  total,
  vendor,
  subtotal,
  setFields,
  JSONcrop,
}) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("bucket", bucket);
  formData.append("subtotal", subtotal);
  formData.append("total", total);
  formData.append("vendor", vendor);
  formData.append("description", description);
  formData.append("setFields", setFields);
  formData.append("crop", JSONcrop);
  const path = `${domainRoot}${receiptCreateUrl}`;

  return postFormData(path, formData, true).then((res) => {
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
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};
