package expo.modules.nativeheader

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.lang.ref.WeakReference

class NativeHeaderModule : Module() {
    
    companion object {
        private var activeLoginView: WeakReference<CapacitorLoginView>? = null

        fun registerLoginView(view: CapacitorLoginView) {
            activeLoginView = WeakReference(view)
        }
    }

    override fun definition() = ModuleDefinition {
        Name("NativeHeader")

        View(NativeHeaderView::class) {
            Prop("userName") { view, prop: String ->
                view.setUserName(prop)
            }
        }


        View(CapacitorLoginView::class) {
            Name("CapacitorLoginView")
        }

        Events("onCapacitorDataReceived")

        Function("sendToWeb") { data: String ->
            val view = activeLoginView?.get()
            view?.sendDataToJavaScript(data)
        }
    }

    fun emitWebData(data: String) {
        sendEvent("onCapacitorDataReceived", mapOf("text" to data))
    }
}