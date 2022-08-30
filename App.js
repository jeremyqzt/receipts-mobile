import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, Button, createTheme } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { LogIn } from './src/pages/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{ title: 'Login' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;