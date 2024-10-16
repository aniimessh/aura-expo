import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type SearchInputProps = {
  value?: string;
  handleChangeText?: (value: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
};

const SearchInput = ({
  value,
  handleChangeText,
  placeholder,
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
