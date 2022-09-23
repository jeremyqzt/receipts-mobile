export const SET_FIELDS_VENDOR = "VENDOR";
export const SET_FIELDS_SUBTOTAL = "SUBTOTAL";
export const SET_FIELDS_TOTAL = "TOTAL";
export const SET_FIELDS_DATE = "DATE";
export const SET_FIELDS_DESCRIPTION = "DESCRIPTION";

export const CHANGE_PASSWORD = 0;
export const CHANGE_CONTACT_EMAIL = 1;
export const CHANGE_CONTACT_PHONE = 2;
export const CHANGE_CONTACT_ADDRESS = 3;
export const CHANGE_CONTACT_CAN_CONTACT = 4;

export const RECEIPT_DATE_CREATED = 0;
export const RECEIPT_DATE = 1;
export const RECEIPT_VENDOR = 2;
export const RECEIPT_AMOUNT_ASC = 3;
export const RECEIPT_AMOUNT_DESC = 4;
export const RECEIPT_DATE_CREATED_EARLY = 5;
export const RECEIPT_DATE_EARLY = 6;

export const searchParams = [
  {
    name: "Date Created - Latest First",
    value: RECEIPT_DATE_CREATED,
  },
  {
    name: "Date Created - Earliest First",
    value: RECEIPT_DATE_CREATED_EARLY,
  },
  {
    name: "Receipt Date - Latest First",
    value: RECEIPT_DATE,
  },
  {
    name: "Receipt Date - Earliest First",
    value: RECEIPT_DATE_EARLY,
  },
  {
    name: "Vendor",
    value: RECEIPT_VENDOR,
  },
  {
    name: "Amount Ascending",
    value: RECEIPT_AMOUNT_ASC,
  },
  {
    name: "Amount Descending",
    value: RECEIPT_AMOUNT_DESC,
  },
];

export const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const UNCATEGORIZED = 1;
const PREPAY = 2;
const ADVERTISING = 3;
const TAX_FEE_DUE = 4;
const INSURANCE = 5;
const INTEREST = 6;
const MAINT = 7;
const MEALS = 8;
const OFFICE = 9;
const SALARY = 10;
const STARTUP = 11;
const CAR = 12;

export const categories = [
  {
    name: "Uncategorized",
    value: UNCATEGORIZED,
  },
  {
    name: "Prepaid Expenses",
    value: PREPAY,
  },
  {
    name: "Advertising",
    value: ADVERTISING,
  },
  {
    name: "Taxes",
    value: TAX_FEE_DUE,
  },
  {
    name: "Insurance",
    value: INSURANCE,
  },
  {
    name: "Interest Expense",
    value: INTEREST,
  },
  {
    name: "Maintenace",
    value: MAINT,
  },
  {
    name: "Meals",
    value: MEALS,
  },
  {
    name: "Office Expenses",
    value: OFFICE,
  },
  {
    name: "Salary Expenses",
    value: SALARY,
  },
  {
    name: "Startup Expenses",
    value: STARTUP,
  },
  {
    name: "Car Expenses",
    value: CAR,
  },
];