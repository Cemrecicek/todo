import { requireNativeModule, EventEmitter } from 'expo-modules-core';
const NativeHeader = requireNativeModule('NativeHeader');

// Modüle özel Event İletişim hattını kuruyoruz
const NativeHeaderEvents = new EventEmitter(NativeHeader);

export { NativeHeader, NativeHeaderEvents };
export default NativeHeader;