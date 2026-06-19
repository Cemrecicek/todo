package expo.modules.nativeheader

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeHeaderModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("NativeHeader")

        View(NativeHeaderView::class) {
            Prop("userName") { view, prop: String ->
                view.setUserName(prop)
            }
        }

       
        View(CapacitorLoginView::class) {
          
        }



        Events("onCapacitorDataReceived")
    }

    fun emitWebData(data: String) {
        sendEvent("onCapacitorDataReceived", mapOf("text" to data))
    }
}