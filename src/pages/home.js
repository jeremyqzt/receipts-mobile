import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";
import { UploadScreen } from "./screens/upload";
import { Icon, Button } from "@rneui/themed";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();
export const Home = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            header: ({ navigation, route, options }) => {
              const title = "Home";

              return (
                <View
                  style={{
                    height: 80,
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      paddingHorizontal: 15,
                    }}
                  >
                    <View>
                      <Text>Receipts</Text>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <Icon name="cog" type="font-awesome-5" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            },
            tabBarIcon: ({ color }) => (
              <Icon name="receipt" type="font-awesome-5" color={color} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Icon name="upload" type="font-awesome-5" color={color} />
            ),
          }}
          name="Upload"
          component={UploadScreen}
        />
        <Tab.Screen
          options={{
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" type="font-awesome-5" color={color} />
            ),
          }}
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </>
  );
};
