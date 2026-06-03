import ExpoModulesCore

public class MyModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyModule")

    Constant("PI") {
      Double.pi
    }

    Function("getPlatform") -> String {
      return "iOS"
    }
  }
}
