import React, { useState } from "react";

import { Input, Button } from "@rneui/themed";
import { View, Image, Text, Linking } from "react-native";
import Logo from "../../assets/logo.png";
import Toast from "react-native-toast-message";
import { loginFetch, singupFetch } from "../utils/loginUtils";
import { validateEmail } from "../utils/validationUtils";
import * as SecureStore from "expo-secure-store";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState();
  const [password2, setPassword2] = useState();
  const [password1, setPassword1] = useState();

  const singupNow = () => {
    if (
      !validateEmail(username) ||
      password1 !== password2 ||
      (password1.length ?? 0) <= 8
    ) {
      Toast.show({
        type: "error",
        text1: "Input Error!",
        text2: "Must provide an valid email and a 8+ length password!",
        position: "bottom",
      });
    }
    setLoading(true);
    const password = password1;

    singupFetch({ username, password })
      .then((res) => {
        if (res.status >= 400) {
          throw "WTF SINGUP";
        }
        return res.json();
      })
      .then(() => {
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
              text2: "Your account has been created but an network occurred logging in!",
              position: "bottom",
            });
          });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Signup Failed!",
          text2: "This is likely a temporary error, please try again!",
          position: "bottom",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
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
          value={username}
          onChangeText={(e) => setUsername(e)}
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "at" }}
        />
        <Input
          value={password1}
          onChangeText={(e) => setPassword1(e)}
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "key" }}
        />
        <Input
          value={password2}
          onChangeText={(e) => setPassword2(e)}
          placeholder="Confirm Password"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "key" }}
        />
      </View>
      <View style={{ paddingHorizontal: "10%", marginTop: "2%" }}>
        <Button
          title={"Privacy Policy"}
          buttonStyle={{ borderRadius: 5 }}
          type="outline"
          onPress={() => {
            Linking.openURL("https://static.ribbonreceipts.com/privacy.html");
          }}
        />
      </View>
      <View style={{ paddingHorizontal: "10%", marginTop: "2%" }}>
        <Button
          title={"Terms of Use"}
          buttonStyle={{ borderRadius: 5 }}
          type="outline"
          onPress={() => {
            Linking.openURL("https://static.ribbonreceipts.com/eula.html");
          }}
        />
      </View>
      <View style={{ paddingHorizontal: "10%", marginTop: "15%" }}>
        <Button
          title={"Sign Up"}
          buttonStyle={{ borderRadius: 5 }}
          onPress={singupNow}
          loading={loading}
        />
      </View>
      <View style={{ paddingHorizontal: "10%", marginTop: "1%" }}>
        <Text style={{ fontSize: 14, color: "grey", textAlign: "center" }}>
          Signing up implies agreement to the privacy policy and the terms of
          use.
        </Text>
      </View>
    </View>
  );
};
