import React, { useEffect, useState } from "react";

import { Input, Button } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logoDark.png";
import { loginFetch } from "../utils/loginUtils";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { parseJwt } from "../utils/tools";
import { useColorScheme } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export const LogIn = ({ navigation }) => {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [usernameS, setUsernameS] = useState();
  const [passwordS, setPasswordS] = useState();
  const [useLocalAuth, setUseLocalAuth] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync((has) => {
      if (has) {
        LocalAuthentication.isEnrolledAsync((enrolled) => {
          setUseLocalAuth(enrolled);
        });
      }
    });

    SecureStore.getItemAsync("username").then((token) => {
      setUsernameS(token);
    });

    SecureStore.getItemAsync("password").then((token) => {
      setPasswordS(token);
    });
  });

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

  const loginNow = (useLocal) => {
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
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("password", password);
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
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        height: "100%",
      }}
    >
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
          leftIcon={{
            type: "font-awesome",
            name: "at",
            color: colorScheme === "dark" ? "grey" : "black",
          }}
          onChangeText={(value) => setUsername(value)}
          style={{
            color: colorScheme === "dark" ? "grey" : "black",
          }}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{
            type: "font-awesome",
            name: "key",
            color: colorScheme === "dark" ? "grey" : "black",
          }}
          style={{
            color: colorScheme === "dark" ? "grey" : "black",
          }}
          onChangeText={(value) => setPassword(value)}
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
      {usernameS && passwordS && useLocalAuth ? (
        <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
          <Button
            title={"Login In With FaceID"}
            loading={loading}
            buttonStyle={{ borderRadius: 5 }}
            onPress={() => {
              LocalAuthentication.authenticateAsync((res) => {
                if (res.success) {
                  loginNow(false);
                } else {
                  Toast.show({
                    type: "error",
                    text1: "🛑 Login Failed!",
                    text2: "FaceID has auth not successful. Please try again!",
                    position: "bottom",
                  });
                }
              });
            }}
          />
        </View>
      ) : null}
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
    </View>
  );
};
