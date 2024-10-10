import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <StatusBar barStyle={"light-content"} />
      </Stack>
    </>
  );
};

export default AuthLayout;
