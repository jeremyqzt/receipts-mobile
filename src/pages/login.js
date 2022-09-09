import React, { useEffect, useState } from "react";

import { Input, Button } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logo.png";
import { loginFetch } from "../utils/loginUtils";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { parseJwt } from "../utils/tools";
export const LogIn = ({ navigation }) => {

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token
      ) => {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 > Date.now()) {
        navigation.reset({
          index: 0,
          routes: [{ name: "homepage" }],
        });
      }
    });
  });

  const loginNow = () => {
    setLoading(true);
    loginFetch({ username, password })
      .then((res) => {
        if (res.status >= 400) {
          throw "WTF LOGIN";
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
          marginTop: "1%",
          width: "100%",
          height: "25%",
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
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "at" }}
          onChangeText={(value) => setUsername(value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
        <Button
          title={"Login"}
          loading={loading}
          buttonStyle={{ borderRadius: 5 }}
          onPress={() => {
            loginNow();
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: "30%" }}>
        <Button
          loading={loading}
          type="clear"
          buttonStyle={{ borderRadius: 5 }}
          title="Signup Here!"
          titleStyle={{ color: "rgb(0, 99, 191)" }}
          onPress={() => {
            navigation.navigate("signup");
          }}
        />
      </View>
    </>
  );
};
