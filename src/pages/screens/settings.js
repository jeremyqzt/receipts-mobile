import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";

export const SettingsScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        <Button 
            title={"Logout!"}
            
            onPress={() => {
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