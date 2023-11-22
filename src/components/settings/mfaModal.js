import { Button, Text, Input } from "@rneui/themed";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import { verifyMfa } from "../../utils/loginUtils";
import { createMfa } from "../../utils/loginUtils";
import * as Clipboard from "expo-clipboard";

export const MfaModal = (props) => {
  const { visible, closeModal, reloadMfa } = props;
  const [loading, setLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  const [mfa, setMfa] = useState(null);

  const copyToClipboard = async (val) => {
    await Clipboard.setStringAsync(val);
  };

  useEffect(() => {
    createMfa().then((res) => {
      const secret = res.split("secret=")[1].split("&")[0];
      setMfa(secret);
    });
  });

  return (
    <Modal avoidKeyboard isVisible={visible} onBackdropPress={closeModal}>
      <Toast />
      <View
        style={[styles.dialog, { backgroundColor: bgColor, borderRadius: 25 }]}
      >
        <View style={[styles.header, { color: textColor }]}>
          <Text h2 style={{ color: textColor }}>
            Setup Mfa
          </Text>
        </View>
        <View style={[styles.header, { color: textColor }]}>
          <Text style={{ color: textColor }}>
            Copy this code into your 2 factor token generator and then input the
            code to verify.
          </Text>
        </View>
        <View style={[styles.header, { color: textColor }]}>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard(mfa).then(() => {
                Toast.show({
                  type: "success",
                  text1: "✅ Success!",
                  text2: "Text Copied!",
                  position: "bottom",
                });
              });
            }}
          >
            <Text
              style={{
                color: textColor,
                borderColor: textColor,
                borderWidth: 1,
                padding: 8,
                backgroundColor: "#F5F5F5"
              }}
            >{`${mfa} 📎`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "100%" }}
              placeholder={"Enter MFA Code"}
              value={mfaCode}
              keyboardType={"numeric"}
              inputContainerStyle={{
                borderBottomColor: textColor,
                color: textColor,
              }}
              style={[styles.input, { color: textColor }]}
              onChangeText={(value) => setMfaCode(value)}
            />
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
              style={{ width: "100%" }}
              loading={loading}
              title="Verify"
              disabled={false}
              onPress={() => {
                setLoading(true);
                verifyMfa(mfaCode)
                  .then(async (res) => {
                    console.log(res)
                    closeModal();
                    setLoading(false);

                    Toast.show({
                      type: "success",
                      text1: "✅ Success!",
                      text2: "MFA successfully setup!",
                      position: "bottom",
                    });
                  })
                  .catch(() => {
                    
                    Toast.show({
                      type: "error",
                      text1: "🛑 Error!",
                      text2: "MFA could not be activated, please try again!",
                      position: "bottom",
                    });
                  }).finally(() => {
                    reloadMfa();
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
