import { NativeModule, requireNativeModule } from "expo";

declare class TodoStorageModule extends NativeModule {
  set(key: string, value: string): Promise<void>;
  getString(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}

export default requireNativeModule<TodoStorageModule>("TodoStorage");