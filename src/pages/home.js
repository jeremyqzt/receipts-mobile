import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";
import { UploadScreen } from "./screens/upload";
import { ChartsScreen } from "./screens/charts";

import { Icon, Text } from "@rneui/themed";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { VALID_CHARTS } from "../constants/chartConstants";
import { ChartSelect } from "../components/charts/chartSelect";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
export const Home = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [chartSelection, setChartSelection] = useState(VALID_CHARTS[0]);
  const colorScheme = useColorScheme();
  const [creating, setCreating] = useState(false);

  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            height: 100,
            paddingHorizontal: 5,
            paddingTop: 0,
            inactiveTintColor: textColor,
            backgroundColor: bgColor,
            activeTintColor: "rgb(220, 53, 69)",
            position: "absolute",
            borderTopWidth: 1,
            borderTopColor: textColor,
          },
        })}
      >
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
                    backgroundColor: bgColor,
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
                      backgroundColor: bgColor,
                      borderBottomColor: textColor,
                    }}
                  >
                    <View>
                      <Text h4 style={{ color: textColor }}>
                        Receipts
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          marginRight: 5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setCreating(true)
                          }}
                        >
                          <Icon
                            name="plus"
                            type="font-awesome-5"
                            color={textColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            },
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : textColor }}>Home</Text>
            ),
            tabBarIcon: ({ focused, color }) => {
              const realColor = focused ? color : textColor;
              return (
                <Icon name="receipt" type="font-awesome-5" color={realColor} />
              );
            },
          }}
          children={({ navigation }) => (
            <HomeScreen
              creating={creating}
              setCreating={(e) => setCreating(e)}
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
                    backgroundColor: bgColor,
                    borderBottomColor: textColor,
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
                      borderBottomColor: textColor,
                    }}
                  >
                    <View>
                      <Text h4 style={{ color: textColor }}>
                        Upload Receipt
                      </Text>
                    </View>
                  </View>
                </View>
              );
            },
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : textColor }}>Upload</Text>
            ),
            tabBarIcon: ({ color, focused }) => {
              const realColor = focused ? color : textColor;
              return (
                <Icon name="upload" type="font-awesome-5" color={realColor} />
              );
            },
          }}
          name="Upload"
          component={UploadScreen}
        />
        <Tab.Screen
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    height: 100,
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    backgroundColor: bgColor,
                    borderBottomColor: textColor,
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
                      paddingBottom: 0,
                      borderBottomColor: textColor,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View>
                        <Text style={{ lineHeight: 72, color: textColor }} h4>
                          Analytics
                        </Text>
                      </View>
                      <View>
                        <ChartSelect
                          activeSelect={chartSelection}
                          opts={VALID_CHARTS}
                          setChartValue={(a) => {
                            setChartSelection(a);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            },
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : textColor }}>
                Analytics
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => {
              const realColor = focused ? color : textColor;
              return (
                <Icon
                  name="chart-bar"
                  type="font-awesome-5"
                  color={realColor}
                />
              );
            },
          }}
          name="Analytics"
          children={({}) => (
            <ChartsScreen
              chartSelection={chartSelection}
              setChartSelection={(e) => setChartSelection(e)}
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
                    backgroundColor: bgColor,
                    borderBottomColor: textColor,
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
                      borderBottomColor: textColor,
                    }}
                  >
                    <View>
                      <Text h4 style={{ color: textColor }}>
                        Ribbon Receipts Settings
                      </Text>
                    </View>
                  </View>
                </View>
              );
            },
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : textColor }}>
                Settings
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => {
              const realColor = focused ? color : textColor;
              return (
                <Icon name="cog" type="font-awesome-5" color={realColor} />
              );
            },
          }}
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
      <Toast />
    </>
  );
};
