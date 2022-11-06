import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";
import { UploadScreen } from "./screens/upload";
import { Icon, Text } from "@rneui/themed";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";

const Tab = createBottomTabNavigator();
export const Home = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    height: 90,
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
                      borderBottomWidth: 1,
                      marginTop: 16,
                      paddingBottom: 8,
                      borderBottomColor: "black",
                    }}
                  >
                    <View>
                      <Text h4>Receipts</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setSettingsModalOpen(true);
                        }}
                      >
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
          children={({navigation}) => (
            <HomeScreen
              settingsModalOpen={settingsModalOpen}
              setSettingsModalOpen={(e) => setSettingsModalOpen(e)}
              navigation={navigation}
            />
          )}
        />
        <Tab.Screen
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    height: 90,
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
                      borderBottomWidth: 1,
                      marginTop: 16,
                      paddingBottom: 8,
                      borderBottomColor: "black",
                    }}
                  >
                    <View>
                      <Text h4>Upload Receipt</Text>
                    </View>
                  </View>
                </View>
              );
            },
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
            header: () => {
              const title = "Home";

              return (
                <View
                  style={{
                    height: 90,
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
                      borderBottomWidth: 1,
                      marginTop: 16,
                      paddingBottom: 8,
                      borderBottomColor: "black",
                    }}
                  >
                    <View>
                      <Text h4>Ribbon Receipts Settings</Text>
                    </View>
                  </View>
                </View>
              );
            },
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
