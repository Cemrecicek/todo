import { NativeModule, requireNativeModule } from 'expo';

declare class MyModule extends NativeModule<{}> {
  PI: number;
  getPlatform(): string;
}

export default requireNativeModule<MyModule>('MyModule');
