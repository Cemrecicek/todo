import { registerWebModule, NativeModule } from 'expo';

class MyModule extends NativeModule<{}> {
  PI = Math.PI;

  getPlatform() {
    return 'Web';
  }
}

export default registerWebModule(MyModule, 'MyModule');
