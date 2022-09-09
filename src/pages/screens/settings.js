import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { View, Image, Text, Linking } from "react-native";

export const SettingsScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button 
            title={"Logout!"}
            
            onPress={async () => {
                await SecureStore.deleteItemAsync("access_token");
                await SecureStore.deleteItemAsync("refresh_token");

                navigation.reset({
                    index: 0,
                    routes: [{ name: "login" }],
                  });
            }}
        />
      </View>
    );
  }