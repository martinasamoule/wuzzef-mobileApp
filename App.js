import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/login/login";
import MainLayout from "./components/mainLayout/mainLayout";

const Stack = createNativeStackNavigator();
export default function App() {
  return (

      <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainLayout" component={MainLayout} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </NativeBaseProvider>
  );
}


