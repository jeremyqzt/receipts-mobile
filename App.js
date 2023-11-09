import { StatusBar } from "expo-status-bar";

import { ThemeProvider, createTheme, useTheme } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { LogIn } from "./src/pages/login";
import { SignUp } from "./src/pages/signup";
import { Home } from "./src/pages/home";
import { MfaLogIn } from "./src/pages/mfa";
import { ResetPassword } from "./src/pages/reset";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

const theme = createTheme({
  colors: {
    primary: "rgb(220, 53, 69)",
    disabled: "rgba(220, 53, 69, 0.3)",
  },
  lightColors: {
    primary: "rgb(220, 53, 69)",
    disabled: "rgba(220, 53, 69, 0.3)",
  },
  darkColors: {
    primary: "rgb(220, 53, 69)",
    disabled: "rgba(220, 53, 69, 0.3)",
    background: "black",
  },
});

const App = () => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <StatusBar backgroundColor={bgColor} translucent />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { opacity: 1, backgroundColor: bgColor },
            cardOverlayEnabled: true,
          }}
        >
          <Stack.Screen
            name="login"
            component={LogIn}
            options={{
              title: "Login",
              backgroundColor: bgColor,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{
              title: "Sign Up",
              headerShown: false,
              backgroundColor: bgColor,
            }}
          />
          <Stack.Screen
            name="mfa"
            component={MfaLogIn}
            options={{
              title: "Multi Factor Auth",
              headerShown: false,
              backgroundColor: bgColor,
            }}
          />
          <Stack.Screen
            name="recovery"
            component={ResetPassword}
            options={{
              title: "Password Recovery",
              headerShown: false,
              backgroundColor: bgColor,
            }}
          />
          <Stack.Screen
            name="homepage"
            component={Home}
            options={{
              title: "Ribbon Receipts",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
