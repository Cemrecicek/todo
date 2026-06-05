package expo.modules.todostorage

import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TodoStorageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TodoStorage")

    AsyncFunction("set") Coroutine { key: String, value: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      TodoDataStoreManager.setString(context, key, value)
    }

    AsyncFunction("getString") Coroutine { key: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      TodoDataStoreManager.getString(context, key)
    }

    AsyncFunction("delete") Coroutine { key: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      TodoDataStoreManager.delete(context, key)
    }
  }
}