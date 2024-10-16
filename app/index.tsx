import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustommButton from "@/components/CustommButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[120px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with
              <Text className="text-secondary-200"> Aura</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
            Where creativity meets innovations: embark on a journey of a
            limitless
          </Text>
          <CustommButton
            title="Continue with Email"
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}
