import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustommButton from "./CustommButton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl mt-2 text-center font-psemibold text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustommButton
        title="Create Video"
        handlePress={() => router.push("/(tabs)/create")}
        containerStyles=" w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
