import React, { useState } from "react";

import { Input, Button } from "@rneui/themed";
import { View, Image, Text } from "react-native";
import Logo from "../../assets/logoDark.png";
import Toast from "react-native-toast-message";
import { loginFetch, singupFetch } from "../utils/loginUtils";
import { validateEmail } from "../utils/validationUtils";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";
import { resetForm, forgotPassword } from "../utils/loginUtils";

export const ResetPassword = ({ navigation }) => {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [username, setUsername] = useState();
  const [password2, setPassword2] = useState();
  const [password1, setPassword1] = useState();
  const [resetCode, setResetCode] = useState();

  const singupNow = () => {
    if (!validateEmail(username) || password1.length < 8) {
      Toast.show({
        type: "error",
        text1: "🛑 Input Error!",
        text2: "Must provide an valid email and a 8+ length password!",
        position: "bottom",
      });
      return;
    }
    if (password1 !== password2) {
      Toast.show({
        type: "error",
        text1: "🛑 Input Error!",
        text2: "Passwords do not match!",
        position: "bottom",
      });
      return;
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
              text2:
                "Your account has been created but an network occurred logging in!",
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
    <>
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "black" : "white",
          height: "100%",
        }}
      >
        <View
          style={{
            marginTop: "10%",
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
            value={username}
            onChangeText={(e) => setUsername(e)}
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              name: "at",
              color: colorScheme === "dark" ? "grey" : "black",
            }}
            style={{
              color: colorScheme === "dark" ? "grey" : "black",
            }}
          />
          {!!emailSent && (
            <Input
              value={resetCode}
              onChangeText={(e) => setResetCode(e)}
              placeholder="Reset Code"
              leftIcon={{
                type: "font-awesome",
                name: "key",
                color: colorScheme === "dark" ? "grey" : "black",
              }}
              style={{
                color: colorScheme === "dark" ? "grey" : "black",
              }}
            />
          )}
          {!!resetCode && (
            <Input
              value={password1}
              onChangeText={(e) => setPassword1(e)}
              placeholder="New Password"
              secureTextEntry={true}
              leftIcon={{
                type: "font-awesome",
                name: "key",
                color: colorScheme === "dark" ? "grey" : "black",
              }}
              style={{
                color: colorScheme === "dark" ? "grey" : "black",
              }}
            />
          )}
          {!!resetCode && (
            <Input
              value={password2}
              onChangeText={(e) => setPassword2(e)}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              leftIcon={{
                type: "font-awesome",
                name: "key",
                color: colorScheme === "dark" ? "grey" : "black",
              }}
              style={{
                color: colorScheme === "dark" ? "grey" : "black",
              }}
            />
          )}
        </View>
        <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
          <Button
            title={resetCode ? "Reset" : "Send Reocvery Email"}
            buttonStyle={{ borderRadius: 5 }}
            onPress={
              resetCode
                ? () => {
                    if (
                      password1 !== password2 ||
                      (password1 || "").length < 8
                    ) {
                      Toast.show({
                        type: "error",
                        text1: "🛑 Error!",
                        text2: "Your password is too short or they dont match.",
                        position: "bottom",
                      });
                      return;
                    }
                    setLoading(true);
                    forgotPassword(username, resetCode, password1)
                      .then(() => {
                        Toast.show({
                          type: "success",
                          text1: "✅ Success!",
                          text2: "Your password has been reset!",
                          position: "bottom",
                        });
                      })
                      .catch(() => {
                        Toast.show({
                          type: "error",
                          text1: "🛑 Error!",
                          text2:
                            "The request to reset has failed, please try again.",
                          position: "bottom",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                : () => {
                    setLoading(true);

                    resetForm(`${username}`.toLowerCase())
                      .then(() => {
                        Toast.show({
                          type: "success",
                          text1: "✅ Success!",
                          text2:
                            "Your request has been processed, please check your email!",
                          position: "bottom",
                        });
                        setEmailSent(true);
                      })
                      .catch(() => {
                        Toast.show({
                          type: "error",
                          text1: "🛑 Error!",
                          text2:
                            "The request to reset has failed, please try again.",
                          position: "bottom",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
            }
            loading={loading}
          />
        </View>

        {!!emailSent && (
          <>
            <View style={{ paddingTop: "7%", marginTop: "1%" }}>
              <Text
                style={{ fontSize: 14, color: "grey", textAlign: "center" }}
              >
                Enter the reset code from the email.
              </Text>
            </View>
            <View style={{ paddingTop: "3%", marginTop: "1%" }}>
              <Text
                style={{ fontSize: 14, color: "grey", textAlign: "center" }}
              >
                Didn't receive a email?
              </Text>
            </View>
            <Button
              loading={loading}
              type="clear"
              buttonStyle={{ borderRadius: 5 }}
              title="Resend it Here!"
              titleStyle={{ color: "rgb(0, 99, 191)" }}
              onPress={() => {
                navigation.navigate("login");
              }}
            />
          </>
        )}

        <View style={{ paddingTop: "7%", marginTop: "1%" }}>
          <Text style={{ fontSize: 14, color: "grey", textAlign: "center" }}>
            Don't need to reset your password?
          </Text>
        </View>
        <Button
          loading={loading}
          type="clear"
          buttonStyle={{ borderRadius: 5 }}
          title="Sign In Here!"
          titleStyle={{ color: "rgb(0, 99, 191)" }}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
      </View>
      <Toast />
    </>
  );
};
