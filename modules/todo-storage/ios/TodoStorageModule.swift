import ExpoModulesCore

public class TodoStorageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TodoStorage")

    AsyncFunction("setValueAsync") { (value: String) in
    }
  }
}
