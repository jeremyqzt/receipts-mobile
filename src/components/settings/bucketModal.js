import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import { createBucket } from "../../utils/bucketUtils";
import Toast from "react-native-toast-message";

const DatePickerLocal = (props) => {
  return (
    <DatePicker
      style={{ width: "100%" }}
      date={props.date}
      mode="date"
      placeholder="Effective Date"
      format="YYYY-MM-DD"
      minDate="2000-01-01"
      maxDate="2100-01-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 10,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 54,
          marginRight: 28,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(date) => {
        props.setDate(date);
      }}
    />
  );
};

export const CreateBucketModal = (props) => {
  const { visible, closeModal } = props;

  const [modalName, setModalName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  return (
    <Modal isVisible={visible} onBackdropPress={closeModal}>
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>🆕 Create Bucket</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🪣</Text>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "85%" }}
              placeholder={"Bucket Name"}
              value={modalName}
              style={styles.input}
              onChangeText={(value) => setModalName(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📃</Text>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "85%" }}
              placeholder={"Bucket Description"}
              value={description}
              style={styles.input}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <DatePickerLocal setDate={setDate} date={date} />
        </View>
        <Button
          style={{ marginTop: 24 }}
          loading={loading}
          title="Create"
          onPress={() => {
            setLoading(true);
            createBucket(
              modalName,
              description,
              date.toISOString().split("T")[0],
            )
              .then(() => {
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
