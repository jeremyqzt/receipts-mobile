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
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
          marginRight: 15,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(date) => {
        props.setDate(date);
      }}
    />
  );
};

const DropdownComponent = (props) => {
  const { category, setCategory } = props;
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (category || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Category
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputIcon}>📊</Text>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "red" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        search
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
  );
};

export const EditModal = (props) => {
  const { receipt = {}, visible, close, updateLocalReceipt, arrayIdx } = props;
  const { total_amount, vendor, description, receipt_date, category, pk } =
    receipt;
  const [receiptCat, setReceiptCat] = useState(category);
  const [amount, setAmount] = useState(total_amount);
  const [lVendor, setVendor] = useState(vendor);
  const [lDescription, setDescription] = useState(description);
  const date = new Date(receipt_date);
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
    },
    uid: pk,
  };

  useEffect(() => {
    if (needLoad && receipt_date) {
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
        
        updateLocalReceipt({
          category: receiptCat,
          vendor: lVendor,
          total_amount: amount,
          receipt_date_datetime: lDate,
          receipt_date: lDate,
        }, arrayIdx);
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  };

  return (
    <Modal isVisible={visible} onBackdropPress={closeModal}>
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>🧾 Edit Receipt</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <DatePickerLocal date={lDate} setDate={setDate} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>💲</Text>

            <Input
              placeholder="Total Amount"
              keyboardType="numeric"
              returnKeyType='done'
              containerStyle={{ width: "85%" }}
              value={`${amount}`}
              style={styles.input}
              {...errorPlaceholder}
              onChangeText={(value) => {
                setAmount(value);
              }}
              onBlur={() => {
                if (isNaN(amount)) {
                  setAmount(total_amount);
                  setIsError(true);
                  setTimeout(() => setIsError(false), 3000);
                }
              }}
            />
          </View>
          <DropdownComponent
            category={receiptCat}
            setCategory={setReceiptCat}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🏬</Text>

            <Input
              returnKeyType='done'
              containerStyle={{ width: "85%" }}
              value={lVendor}
              style={styles.input}
              onChangeText={(value) => setVendor(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📓</Text>

            <Input
              returnKeyType='done'
              containerStyle={{ width: "85%" }}
              value={lDescription}
              style={styles.input}
              onChangeText={(value) => setDescription(value)}
            />
          </View>

          <Button loading={loading} title="Save" onPress={save} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginTop: 5,
    fontSize: 35,
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
