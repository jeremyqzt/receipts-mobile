import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, Button, createTheme } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { LogIn } from './src/pages/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  colors: {
    primary: 'rgb(220, 53, 69)',
  },
  lightColors: {
    primary: 'rgb(220, 53, 69)',
  },
  darkColors: {
    primary: 'rgb(220, 53, 69)',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
        >
          <Stack.Screen
            name="login"
            component={LogIn}
            options={{ title: 'Ribbon Receipts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;