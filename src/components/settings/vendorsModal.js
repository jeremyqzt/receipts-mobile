import { Button, Input, Text } from "@rneui/themed";
import { StyleSheet, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import { createBucket } from "../../utils/bucketUtils";
import Toast from "react-native-toast-message";
import { useAtom } from "jotai";
import { bucketAtom } from "../../atom/atom";
import { Chip } from "@rneui/themed";
import { getVendors, addVendors } from "../../utils/receiptUtils";
import { useFetch } from "../../hooks/";

export const CreateVendorsModal = (props) => {
  const { visible, closeModal } = props;

  const [vendorName, setVendorName] = useState("");
  const [lloading, setLoading] = useState(false);
  const [localVendors, setLocalVendor] = useState([]);

  const { response: remoteVendors, loading: loadingVendors } =
    useFetch(getVendors);
  const loading = loadingVendors || lloading;

  const vendors = [...(localVendors || []), ...(remoteVendors || [])];
  return (
    <Modal avoidKeyboard isVisible={visible} onBackdropPress={closeModal}>
      <View style={styles.dialog}>
        <View style={styles.header}>
          <Text h2>Create Vendors</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>Name: </Text>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "50%" }}
              placeholder={"Vendor Name"}
              value={vendorName}
              style={styles.input}
              onChangeText={(value) => setVendorName(value)}
            />
            <View style={{ width: "20%", marginLeft: "10%" }}>
              <Button
                loading={loading}
                title="Add"
                onPress={() => {
                  setLoading(true);
                  addVendors(vendorName)
                    .then((r) => {
                      setLocalVendor(() => [...localVendors, { ...r }]);
                    })
                    .catch(() => {
                      Toast.show({
                        type: "error",
                        text1: "🛑 Error!",
                        text2: "Vendor could not be added, please try again!",
                        position: "bottom",
                      });
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginHorizontal: 10,
              marginVertical: 5,
              overflow: "scroll",
            }}
          >
            <ScrollView
              style={{
                maxHeight: 300,
              }}
            >
              <View>
                {(vendors || []).map((r) => {
                  return (
                    <View>
                      <Chip
                        title={r.name}
                        type="outline"
                        icon={{
                          name: "close",
                          type: "font-awesome",
                          size: 20,
                          color: "red",
                        }}
                        iconRight
                        containerStyle={{
                          marginVertical: 5,
                          marginHorizontal: 5,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 24, width: "100%" }}>
            <Button
              loading={loading}
              title="Done"
              onPress={() => {
                closeModal();
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
    width: "20%",
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
