import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-datepicker";

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
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Select Category
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
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Category" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => <View />}
      />
    </View>
  );
};

export const EditModal = (props) => {
  const { receipt = {}, visible, close } = props;
  const { total_amount, vendor, description, receipt_date } = receipt;
  const [amount, setAmount] = useState(total_amount);
  const [lVendor, setVendor] = useState(vendor);
  const [lDescription, setDescription] = useState(description);
  const date = new Date(receipt_date);

  const [lDate, setDate] = useState(date);

  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>🧾 Edit Receipt</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <DatePickerLocal date={date} setDate={setDate} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>💲</Text>

            <Input
              containerStyle={{ width: "85%" }}
              placeholder={`$${total_amount}`}
              style={styles.input}
              onChangeText={(value) => {
                setAmount(value);
              }}
            />
          </View>
          <DropdownComponent />
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🏬</Text>

            <Input
              containerStyle={{ width: "85%" }}
              placeholder={vendor}
              style={styles.input}
              onChangeText={(value) => setVendor(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📓</Text>

            <Input
              containerStyle={{ width: "85%" }}
              placeholder={description}
              style={styles.input}
              onChangeText={(value) => setDescription(value)}
            />
          </View>

          <Button title="Save" onPress={close} />
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
