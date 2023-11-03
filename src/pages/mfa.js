import React, { useEffect, useState } from "react";

import { Input, Button, Icon, Text } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logoDark.png";
import { loginFetch } from "../utils/loginUtils";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { parseJwt } from "../utils/tools";
import { useColorScheme } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export const MfaLogIn = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  const tryMfa = () => {
    setLoading(true);

    logInMfa({
      token,
    })
      .then((res) => {
        if (res.status >= 400) {
          throw "Login error";
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
        <View style={{ paddingHorizontal: "10%" }}>
          <Input
            placeholder="Multi Factor Token"
            leftIcon={{
              type: "font-awesome",
              name: "at",
              color: colorScheme === "dark" ? "grey" : "black",
            }}
            onChangeText={(value) => setToken(value)}
            style={{
              color: colorScheme === "dark" ? "grey" : "black",
            }}
          />
        </View>
        <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
          <Button
            title={"Login"}
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
              navigation.navigate("login");
            }}
          >
            {"Go Back"}
            <Icon name="link" color="rgb(220, 53, 69)" />
          </Button>
        </View>
      </View>
      <Toast />
    </>
  );
};
