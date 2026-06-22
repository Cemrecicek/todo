import { requireNativeModule, EventEmitter } from 'expo-modules-core';
const NativeHeader = requireNativeModule('NativeHeader');
const NativeHeaderEvents = new EventEmitter(NativeHeader);
interface NativeHeaderModuleType {
  sendToWeb(data: string): void;
}


const NativeHeaderWithMethods = NativeHeader as NativeHeaderModuleType;

export { NativeHeaderWithMethods as NativeHeader, NativeHeaderEvents };
export default NativeHeaderWithMethods;