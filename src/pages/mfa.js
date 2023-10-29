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

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [usernameS, setUsernameS] = useState();
  const [passwordS, setPasswordS] = useState();
  const [useLocalAuth, setUseLocalAuth] = useState(false);


  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token) => {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 > Date.now()) {
        navigation.reset({
          index: 0,
          routes: [{ name: "homepage" }],
        });
      }
    });
  });

  const tryMfa = () => {
    setLoading(true);

    loginFetch({
      username: useLocal ? username : usernameS,
      password: useLocal ? password : passwordS,
    })
      .then((res) => {
        if (res.status >= 400) {
          throw "Login error";
        }
        return res.json();
      })
      .then(async (res) => {
        await SecureStore.setItemAsync(
          "username",
          useLocal ? username : usernameS
        );
        await SecureStore.setItemAsync(
          "password",
          useLocal ? password : passwordS
        );
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
          text1: "🛑 Login Failed!",
          text2: "Incorrect E-mail and password pair. Please try again!",
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
              loginNow(true);
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
