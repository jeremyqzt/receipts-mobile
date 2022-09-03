import { StatusBar } from "expo-status-bar";

import { ThemeProvider, createTheme } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { LogIn } from "./src/pages/login";
import { SignUp } from "./src/pages/signup";
import { Home } from './src/pages/home';
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
      <StatusBar backgroundColor={'transparent'} translucent/>
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
          <Stack.Screen
            name="homepage"
            component={Home}
            options={{
              title: "Ribbon Receipts",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
