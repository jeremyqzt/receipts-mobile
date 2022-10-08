import {
  domainRoot,
  receiptCreateUrl,
  receiptUpdateUrl,
} from "../constants/constants";
import { postData, postFormData } from "./mainUtils";

export const postReceipt = async ({ image, bucket }) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("bucket", bucket);

  const crop = { x: null, y: null, width: null, height: null };
  formData.append("crop", JSON.stringify(crop));
  formData.append("setFields", JSON.stringify({}));
  const path = `${domainRoot}${receiptCreateUrl}`;

  return postFormData(path, formData).then((res) => {
    console.log(JSON.stringify(res))
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
