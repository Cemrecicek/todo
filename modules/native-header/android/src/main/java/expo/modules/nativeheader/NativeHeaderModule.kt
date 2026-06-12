package expo.modules.nativeheader

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeHeaderModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("NativeHeader")

        View(NativeHeaderView::class) {
            Prop("userName") { view: NativeHeaderView, userName: String ->
                view.setUserName(userName)
            }
            Events("onInputChange")
        }
    }
}