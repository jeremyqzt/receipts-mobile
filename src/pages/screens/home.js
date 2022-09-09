import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { View, Image, Text, Linking } from "react-native";
import {getReceipts} from '../../utils/fetchUtils';

export const HomeScreen = () => {

    useEffect(() => {
        getReceipts().then(res => res.json()).then((res) => {
            console.log(res)
        })
    })
    
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
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