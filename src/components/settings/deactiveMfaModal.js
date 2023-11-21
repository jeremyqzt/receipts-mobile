import { Button, Text, Input } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import { deleteAccount } from "../../utils/loginUtils";
import { disableMfa } from "../../utils/loginUtils";

export const DeactivateMfaModal = (props) => {
  const { visible, closeModal, reloadMfa } = props;
  const [loading, setLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  return (
    <Modal avoidKeyboard isVisible={visible} onBackdropPress={closeModal}>
      <View
        style={[styles.dialog, { backgroundColor: bgColor, borderRadius: 25 }]}
      >
        <View style={[styles.header, { color: textColor }]}>
          <Text h2 style={{ color: textColor }}>
            Deactivate Multifactor Auth
          </Text>
        </View>
        <View style={[styles.header, { color: textColor }]}>
          <Text style={{ color: textColor }}>
            Deactivate Multifactor Authentication, please provide the code in
            your authenticator app to complete this action.
          </Text>
        </View>
        <View style={[styles.header, { color: textColor }]}>
          <Text style={{ color: textColor }}>
            If you don't have access to this code, you can reset your password -
            This will also reset your Multifactor Authentication.
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Input
              returnKeyType="done"
              containerStyle={{ width: "100%" }}
              placeholder={"Enter MFA Code"}
              value={mfaCode}
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
              title="Deactivate"
              disabled={false}
              onPress={() => {
                setLoading(true);
                disableMfa(mfaCode)
                  .then(async () => {
                    closeModal();
                    setLoading(false);

                    Toast.show({
                      type: "success",
                      text1: "✅ Success!",
                      text2: "MFA successfully removed!",
                      position: "bottom",
                    });
                  })
                  .catch(() => {
                    Toast.show({
                      type: "error",
                      text1: "🛑 Error!",
                      text2: "MFA could not be deactivated, please try again!",
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
