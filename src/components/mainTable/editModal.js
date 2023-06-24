import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { categories } from "../../constants/categoryConstants";
import { updateReceipts } from "../../utils/receiptUtils";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const AndroidPicker = (props) => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  const [show, setShow] = useState(false);
  let d;
  const textColor = colorScheme === "dark" ? "white" : "black";

  try {
    if (!(props?.date instanceof Date)) {
      const dateTime = props.date
        ? new Date(`${props.date}T00:00:00`)
        : new Date();
      d = dateTime;
    } else {
      d = props.date;
    }
  } catch {
    d = new Date();
  }

  return (
    <View style={{ width: "60%", marginBottom: 16 }}>
      <TouchableOpacity
        style={{ marginLeft: 8 }}
        onPress={() => {
          setShow(true);
        }}
      >
        <View style={{ height: 48 }}>
          <Text
            style={{
              lineHeight: 48,
              color: textColor,
              backgroundColor: "#DCDCDC",
              borderRadius: 16,
              paddingLeft: 8,
            }}
          >
            {d.toISOString().split("T")[0]}
          </Text>
        </View>
      </TouchableOpacity>
      {show ? (
        <DateTimePicker
          value={d}
          mode={"date"}
          display="calendar"
          maximumDate={new Date(2100, 1, 1)}
          minimumDate={new Date(1900, 1, 1)}
          onChange={(_, d) => {
            setShow(false);
            props.setDate(d.toISOString().split("T")[0]);
          }}
          style={{
            width: "60%",
            marginVertical: 8,
            backgroundColor: bgColor,
            height: 36,
          }}
          placeholder="Effective Date"
        />
      ) : null}
    </View>
  );
};

const DatePickerLocal = (props) => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  let d;

  try {
    if (!(props?.date instanceof Date)) {
      const dateTime = props.date
        ? new Date(`${props.date}T00:00:00`)
        : new Date();
      d = dateTime;
    } else {
      d = props.date;
    }
  } catch {
    d = new Date();
  }

  return (
    <View style={{ width: "60%", marginBottom: 16 }}>
      <DateTimePicker
        value={d}
        mode={"date"}
        display="default"
        maximumDate={new Date(2100, 1, 1)}
        minimumDate={new Date(1900, 1, 1)}
        onChange={(_, d) => {
          props.setDate(d.toISOString().split("T")[0]);
        }}
        style={{
          width: "60%",
          marginVertical: 8,
          backgroundColor: bgColor,
          height: 36,
        }}
        placeholder="Effective Date"
      />
    </View>
  );
};

const DropdownComponent = (props) => {
  const { category, setCategory } = props;
  const [isFocus, setIsFocus] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.inputIcon, { color: textColor }]}>Category: </Text>
      <View style={{ width: "65%", marginBottom: 16, marginLeft: 8 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "red" }]}
          placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
          selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
          inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
          iconStyle={styles.iconStyle}
          data={categories}
          maxHeight={300}
          labelField="name"
          valueField="value"
          placeholder={!isFocus ? "Category" : "..."}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCategory(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => <View />}
        />
      </View>
    </View>
  );
};

const VendorDropdownComponent = (props) => {
  const { vendors = [], setVendor, vendor } = props;
  const [isFocus, setIsFocus] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  const [enteredVendor, setEnteredVendor] = useState(null);

  const vendorsInList = vendors.some((v) => v.name === vendor);
  const realValue = vendors.find((v) => v.name === vendor)?.id;

  const realVendors = [
    ...(enteredVendor ? [{ id: -2, name: enteredVendor }] : []),
    ...(vendorsInList ? [] : [{ id: -1, name: vendor }]),
    ...vendors,
  ];

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.inputIcon, { color: textColor }]}>Vendor: </Text>
      <View style={{ width: "65%", marginBottom: 16, marginLeft: 8 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "red" }]}
          placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
          selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
          inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
          iconStyle={styles.iconStyle}
          data={realVendors}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? vendor : "..."}
          value={realValue}
          keyboardAvoiding
          onChangeText={(v) => setEnteredVendor(v)}
          onBlur={() => {
            setIsFocus(false);
          }}
          search
          searchPlaceholder="Enter a Vendor..."
          onFocus={() => setIsFocus(true)}
          onChange={(item) => {
            setVendor(item.name);
            setIsFocus(false);
          }}
          renderLeftIcon={() => <View />}
        />
      </View>
    </View>
  );
};

export const EditModal = (props) => {
  const {
    receipt = {},
    visible,
    close,
    updateLocalReceipt,
    arrayIdx,
    parentReload,
    vendors,
  } = props;
  const { total_amount, vendor, description, receipt_date, category, pk } =
    receipt;
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  const [receiptCat, setReceiptCat] = useState(category);
  const [amount, setAmount] = useState(total_amount);
  const [lVendor, setVendor] = useState(vendor);
  const [lDescription, setDescription] = useState(description);
  const date = receipt_date ? new Date(receipt_date) : new Date();
  const [lDate, setDate] = useState(date);
  const [needLoad, setNeedLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const postData = {
    update_data: {
      category: receiptCat,
      vendor: lVendor,
      total_amount: amount,
      ...(lDate ? { receipt_date_datetime: lDate, receipt_date: lDate } : {}),
      description: lDescription,
    },
    uid: pk,
  };

  useEffect(() => {
    if (parentReload !== null || (needLoad && visible && pk)) {
      setReceiptCat(category);
      setAmount(total_amount);
      setVendor(vendor);
      setDescription(description);
      setNeedLoad(false);
      setDate(receipt_date);
    }
  }, [
    needLoad,
    setNeedLoad,
    setDescription,
    setVendor,
    setAmount,
    setReceiptCat,
    category,
    total_amount,
    vendor,
    description,
    receipt_date,
    receipt,
    pk,
    parentReload,
  ]);

  const closeModal = () => {
    if (!loading) {
      setNeedLoad(true);
      close();
    }
  };

  const errorPlaceholder = isError
    ? {
        errorStyle: { color: "red" },
        errorMessage: "Please enter a valid amount!",
      }
    : {};

  const save = () => {
    setIsLoading(true);
    updateReceipts(postData)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "✅ Success!",
          text2: "Your receipt information has been updated!",
          position: "bottom",
        });

        updateLocalReceipt(
          {
            category: receiptCat,
            vendor: lVendor,
            total_amount: amount,
            receipt_date_datetime: lDate,
            receipt_date: lDate,
            description: lDescription,
          },
          arrayIdx
        );
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  };

  return (
    <Modal isVisible={visible} onBackdropPress={closeModal} avoidKeyboard>
      <View style={[styles.dialog, { backgroundColor: bgColor }]}>
        <View
          style={[
            styles.header,
            { backgroundColor: bgColor, color: textColor },
          ]}
        >
          <Text h2 style={{ color: textColor }}>
            Edit Receipt
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>
              Amount:
            </Text>

            <Input
              placeholder="Total Amount"
              keyboardType="numeric"
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              value={`${amount}`}
              inputContainerStyle={{ borderBottomColor: textColor }}
              style={[styles.input, { color: textColor }]}
              {...errorPlaceholder}
              onChangeText={(value) => {
                setAmount(value);
              }}
              onBlur={() => {
                if (isNaN(amount)) {
                  setAmount(Number(total_amount).toFixed(2));
                  setIsError(true);
                  setTimeout(() => setIsError(false), 3000);
                } else {
                  setAmount(Number(amount).toFixed(2));
                }
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>Date: </Text>

            {Platform.OS == "ios" ? (
              <DatePickerLocal date={lDate} setDate={setDate} />
            ) : (
              <AndroidPicker date={lDate} setDate={setDate} />
            )}
          </View>

          <DropdownComponent
            category={receiptCat}
            setCategory={setReceiptCat}
          />
          <VendorDropdownComponent
            vendors={vendors}
            vendor={lVendor}
            setVendor={(value) => {
              setVendor(value);
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>
              Description:{" "}
            </Text>

            <Input
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              placeholder={"Enter a description..."}
              inputContainerStyle={{ borderBottomColor: textColor }}
              value={lDescription}
              style={[styles.input, { color: textColor }]}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <View
            style={{
              marginTop: 0,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 0, width: "48%" }}>
              <Button
                style={{ width: "100%" }}
                color="#cccccc"
                title="Cancel"
                onPress={() => close()}
              />
            </View>
            <View style={{ marginTop: 0, width: "47%" }}>
              <Button loading={loading} title="Save" onPress={save} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    width: "40%",
    marginTop: 5,
    fontSize: 16,
    lineHeight: 48,
    fontWeight: "bold",
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttomBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtn: {
    flex: 1,
  },

  dialog: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  dropdown: {
    height: 45,
    width: "85%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 0,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
