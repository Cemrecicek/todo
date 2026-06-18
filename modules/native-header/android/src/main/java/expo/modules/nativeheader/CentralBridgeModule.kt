package expo.modules.nativeheader

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CentralBridgeModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CentralBridge")

        Events("onCapacitorDataReceived")
    }


    fun sendData(data: String) {
        sendEvent("onCapacitorDataReceived", mapOf("text" to data))
    }
}