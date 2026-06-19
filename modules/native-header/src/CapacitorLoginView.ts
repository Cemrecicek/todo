import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type CapacitorLoginViewProps = {
  style?: StyleProp<ViewStyle>;
};

export default requireNativeViewManager<{}>('NativeHeader_CapacitorLoginView') as React.ComponentType<CapacitorLoginViewProps>;