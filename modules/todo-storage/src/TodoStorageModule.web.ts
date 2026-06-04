import { registerWebModule, NativeModule } from 'expo';

class TodoStorageModule extends NativeModule<{}> {
  async setValueAsync(value: string): Promise<void> {}
}

export default registerWebModule(TodoStorageModule, 'TodoStorageModule');
