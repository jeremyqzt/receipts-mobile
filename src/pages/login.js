import React, { useState } from "react";

import { Input, Button } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logo.png";

export const LogIn = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginNow = () => {
    loginFetch({ username, password })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
          buttonStyle={{ borderRadius: 5 }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "homepage" }],
            });
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: "30%" }}>
        <Button
          type="clear"
          buttonStyle={{ borderRadius: 5 }}
          title="Signup Here!"
          titleStyle={{ color: "rgb(0, 99, 191)" }}
          onPress={() => {
            loginNow();
            navigation.navigate("signup");
          }}
        />
      </View>
    </>
  );
};
