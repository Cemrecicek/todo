import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { ViewStyle, NativeSyntheticEvent } from "react-native";


type OnInputChangeEvent = {
  text: string;
};

type NativeHeaderViewProps = {
  userName: string;
  style?: ViewStyle;
  onInputChange?: (event: NativeSyntheticEvent<OnInputChangeEvent>) => void;
};

const NativeHeaderNativeView =
  requireNativeViewManager<NativeHeaderViewProps>("NativeHeader");

export default function NativeHeaderView(props: NativeHeaderViewProps) {
  return <NativeHeaderNativeView {...props} />;
}