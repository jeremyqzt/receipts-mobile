import {
    totalCostsUrl,
    domainRoot,
    averageCostsUrl,
    vendorCountUrl,
    receiptCountUrl,
    receiptCategoryCountUrl,
    totalMonthlyCostsUrl,
  } from "../constants/constants";
  
  import { getData } from "./mainUtils";
  
  export const getTotalCosts = async () => {
    const data = {};
    const path = `${domainRoot}${totalCostsUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };
  
  export const getTotalMonthlyCosts = async () => {
    const data = {};
    const path = `${domainRoot}${totalMonthlyCostsUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };
  
  export const getAverageCosts = async () => {
    const data = {};
    const path = `${domainRoot}${averageCostsUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };
  
  export const getVendorCount = async () => {
    const data = {};
    const path = `${domainRoot}${vendorCountUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };
  
  export const getReceiptCount = async () => {
    const data = {};
    const path = `${domainRoot}${receiptCountUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };
  
  export const getReceiptCategoryCount = async () => {
    const data = {};
    const path = `${domainRoot}${receiptCategoryCountUrl}`;
    return getData(path, data, true).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  };