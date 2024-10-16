import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn: Animatable.CustomAnimation = {
  0: { scaleX: 0.9, scaleY: 0.9 },
  1: { scaleX: 1, scaleY: 1 },
};

const zoomOut: Animatable.CustomAnimation = {
  0: { scaleX: 1, scaleY: 1 },
  1: { scaleX: 0.9, scaleY: 0.9 },
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const TrendingItem = ({ item, activeItem }: any) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className=""
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
          className="w-52 h-72 rounded-[35px] bg-white/10 mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status?.isLoaded && !status.isPlaying) {
              setPlay(false); // Stop playback when finished
            }
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className="relative justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className=" w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="h-12 w-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type Post = {
  $id: string;
  id: number;
};
type Props = {
  post: Post[];
};
const Trending = ({ post }: Props) => {
  const [activeItem, setActiveItem] = useState(post[1]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const viewAbleItemChange = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={post}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      horizontal
      onViewableItemsChanged={viewAbleItemChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        y: 0,
      }}
    />
  );
};

export default Trending;
