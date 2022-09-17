import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Upload"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};
