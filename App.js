import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { ThemeProvider, Button, createTheme } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { LogIn } from "./src/pages/login";
import { SignUp } from "./src/pages/signup";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const theme = createTheme({
  colors: {
    primary: "rgb(220, 53, 69)",
  },
  lightColors: {
    primary: "rgb(220, 53, 69)",
  },
  darkColors: {
    primary: "rgb(220, 53, 69)",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {  opacity: 1, backgroundColor: "white" },
            cardOverlayEnabled: true
          }}
        >
          <Stack.Screen
            name="login"
            component={LogIn}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{
              title: "Sign Up",
              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
