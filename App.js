import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/registration/login";
import MainLayout from "./components/mainLayout/mainLayout";
import SignUp from "./components/registration/signUp";

const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="MainLayout" component={MainLayout} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


