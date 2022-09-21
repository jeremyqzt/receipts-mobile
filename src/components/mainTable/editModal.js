import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

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
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
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
        placeholder={!isFocus ? "Select item" : "..."}
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
  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>Edit Receipt</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Amount"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              style={styles.input}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Amount"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              style={styles.input}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Vendor"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              style={styles.input}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Description"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              style={styles.input}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <DropdownComponent />
          <Button title="Save" onPress={close} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  input: {
    padding: 10,
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
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
