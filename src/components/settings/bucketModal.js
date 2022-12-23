import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import { createBucket } from "../../utils/bucketUtils";
import Toast from "react-native-toast-message";
import { useAtom } from "jotai";
import { bucketAtom } from "../../atom/atom";
import { useColorScheme } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerLocal = (props) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  return (
    <DateTimePicker
      value={props.date}
      mode={"date"}
      display="default"
      maximumDate={new Date(2100, 1, 1)}
      minimumDate={new Date(1900, 1, 1)}
      onChange={(_,d) => {
        props.setDate(d);
      }}
      style={{ width: "60%", marginVertical: 8, backgroundColor: bgColor }}
      placeholder="Effective Date"
    />
  );

  return (
    <DatePicker
      style={{ width: "60%", marginVertical: 8 }}
      date={props.date}
      mode="date"
      placeholder="Effective Date"
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
          color: textColor,
        },
      }}
      onDateChange={(date) => {
        props.setDate(date);
      }}
    />
  );
};

export const CreateBucketModal = (props) => {
  const { visible, closeModal } = props;
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  const [modalName, setModalName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [bAtom, setBucketAtom] = useAtom(bucketAtom);

  return (
    <Modal avoidKeyboard isVisible={visible} onBackdropPress={closeModal}>
      <View style={[styles.dialog, { backgroundColor: bgColor }]}>
        <View style={styles.header}>
          <Text h2 style={{ color: textColor }}>
            Create Bucket
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>Name: </Text>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "60%" }}
              placeholder={"Bucket Name"}
              value={modalName}
              inputContainerStyle={{
                borderBottomColor: textColor,
                color: textColor,
              }}
              style={[styles.input, { color: textColor }]}
              onChangeText={(value) => setModalName(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>
              Description:{" "}
            </Text>
            <Input
              returnKeyType="done"
              inputContainerStyle={{
                borderBottomColor: textColor,
                color: textColor,
              }}
              containerStyle={{ width: "60%" }}
              placeholder={"Bucket Description"}
              value={description}
              style={[styles.input, { color: textColor }]}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputIcon, { color: textColor }]}>
              Effective Date:{" "}
            </Text>
            <DatePickerLocal setDate={setDate} date={date} />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button
              style={{ width: "100%" }}
              color="#cccccc"
              loading={loading}
              title="Cancel"
              onPress={() => closeModal()}
            />
          </View>
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button
              loading={loading}
              title="Create"
              onPress={() => {
                setLoading(true);
                createBucket(
                  modalName,
                  description,
                  date.toISOString().split("T")[0]
                )
                  .then(() => {
                    setBucketAtom(bAtom + 1);
                    Toast.show({
                      type: "success",
                      text1: "✅ Success!",
                      text2: "Your bucket has been created!",
                      position: "bottom",
                    });
                  })
                  .catch(() => {
                    Toast.show({
                      type: "error",
                      text1: "🛑 Error!",
                      text2: "Bucket could not be created, please try again!",
                      position: "bottom",
                    });
                  })
                  .finally(() => {
                    closeModal();
                    setLoading(false);
                  });
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 48,
    width: "40%",
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
