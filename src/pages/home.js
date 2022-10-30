import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";
import { UploadScreen } from "./screens/upload";
import { Icon } from "@rneui/themed";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
export const Home = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="receipt" type="font-awesome-5" color={color} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="upload" type="font-awesome-5" color={color} />
            ),
          }}
          name="Upload"
          component={UploadScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
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
