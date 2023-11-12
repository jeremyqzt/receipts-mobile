import React, { useEffect, useState } from "react";

import { Input, Button, Icon, Text } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logoDark.png";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import {logInMfa} from "../utils/loginUtils";

export const MfaLogIn = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState("");
  const [remain, setRemain] = useState(45);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemain((o) => o - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remain <= 0) {
      Promise.all([
        SecureStore.deleteItemAsync("access_token"),
        SecureStore.deleteItemAsync("refresh_token"),
      ]).then(() => {
        navigation.navigate("login");
      });
    }
  }, [remain]);

  const tryMfa = () => {
    setLoading(true);

    logInMfa({
      token,
    })
      .then((res) => {
        if (res.status >= 400) {
          throw "Verification error";
        }
        return res.json();
      })
      .then(async (res) => {
        await SecureStore.setItemAsync("access_token", res.access);
        await SecureStore.setItemAsync("refresh_token", res.refresh);

        navigation.reset({
          index: 0,
          routes: [{ name: "homepage" }],
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Token Verification Failed!",
          text2: "Incorrect Multi Factor Token. Please try again!",
          position: "bottom",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "black" : "white",
          height: "100%",
        }}
      >
        <View
          style={{
            marginTop: "15%",
            width: "100%",
            height: "20%",
            margin: "auto",
          }}
        >
          <Image
            style={{
              width: null,
              height: "50%",
              resizeMode: "contain",
              marginTop: "10%",
            }}
            source={Logo}
          />
        </View>
        <View style={{ paddingHorizontal: "12%", paddingVertical: "5%" }}>
          <Text>
            {`You have enabled 2-factor authentication on your account. You're current session will expire in ${remain} seconds. Please provide the 2-factor code to continue your session.`}
          </Text>
        </View>
        <View style={{ paddingHorizontal: "10%" }}>
          <Input
            placeholder="Multi Factor Token"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: colorScheme === "dark" ? "grey" : "black",
            }}
            keyboardType={"numeric"}
            onChangeText={(value) => setToken(value)}
            style={{
              color: colorScheme === "dark" ? "grey" : "black",
            }}
          />
        </View>
        <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
          <Button
            title={"Verify"}
            loading={loading}
            buttonStyle={{ borderRadius: 5 }}
            onPress={() => {
              tryMfa();
            }}
          />
        </View>
        <View style={{ paddingHorizontal: "10%", marginTop: "7%" }}>
          <Button
            type="outline"
            loading={loading}
            buttonStyle={{ borderRadius: 5 }}
            onPress={() => {
              Promise.all([
                SecureStore.deleteItemAsync("access_token"),
                SecureStore.deleteItemAsync("refresh_token"),
              ]).then(() => {
                navigation.navigate("login");
              });
            }}
          >
            <Icon
              type="font-awesome"
              name="backward"
              color="rgb(220, 53, 69)"
            />
            {" Go Back"}
          </Button>
        </View>
      </View>
      <Toast />
    </>
  );
};
