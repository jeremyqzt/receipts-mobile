import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-datepicker";
import { categories } from "../../constants/categoryConstants";
import { updateReceipts } from "../../utils/receiptUtils";
import Toast from "react-native-toast-message";

const DatePickerLocal = (props) => {
  return (
    <View style={{ width: "60%", marginBottom: 16 }}>
      <DatePicker
        style={{ width: "100%" }}
        date={props.date}
        mode="date"
        placeholder="Select Receipt Date"
        format="YYYY-MM-DD"
        minDate="2000-01-01"
        maxDate="2100-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            marginLeft: 8,
            marginRight: 8,
          },
        }}
        onDateChange={(date) => {
          props.setDate(date);
        }}
      />
    </View>
  );
};

const DropdownComponent = (props) => {
  const { category, setCategory } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.inputIcon}>Category: </Text>
      <View style={{ width: "65%", marginBottom: 16, marginLeft: 8 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "red" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
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

export const EditModal = (props) => {
  const {
    receipt = {},
    visible,
    close,
    updateLocalReceipt,
    arrayIdx,
    parentReload,
  } = props;
  const { total_amount, vendor, description, receipt_date, category, pk } =
    receipt;
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
      receipt_date_datetime: lDate,
      receipt_date: lDate,
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
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>Edit Receipt</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>Amount:</Text>

            <Input
              placeholder="Total Amount"
              keyboardType="numeric"
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              value={`${amount}`}
              style={styles.input}
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
            <Text style={styles.inputIcon}>Date: </Text>

            <DatePickerLocal date={lDate} setDate={setDate} />
          </View>

          <DropdownComponent
            category={receiptCat}
            setCategory={setReceiptCat}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>Vendor: </Text>

            <Input
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              placeholder={"Set a vendor..."}
              value={lVendor}
              style={styles.input}
              onChangeText={(value) => setVendor(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>Description: </Text>

            <Input
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              placeholder={"Enter a description..."}
              value={lDescription}
              style={styles.input}
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
