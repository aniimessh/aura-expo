import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({
  title,
  containerStyles,
  titleStyles,
  subtitle,
}: {
  title: string | number;
  containerStyles?: string;
  titleStyles?: string;
  subtitle?: string;
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-gray-100 font-pregular text-sm text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
