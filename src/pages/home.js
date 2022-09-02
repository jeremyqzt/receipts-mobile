import { Input, Button } from "@rneui/themed";
import { View, Image, Text, Linking } from "react-native";
import Logo from "../../assets/logo.png";

export const Home = () => {
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
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "at" }}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "key" }}
        />
        <Input
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
        <Button title={"Sign Up"} buttonStyle={{ borderRadius: 5 }} />
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
