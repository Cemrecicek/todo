package expo.modules.todostorage

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TodoStorageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TodoStorage")

    AsyncFunction("set") { key: String, value: String ->
      val context = appContext.reactContext ?: return@AsyncFunction
      val prefs = context.getSharedPreferences("todo_storage", Context.MODE_PRIVATE)

      prefs.edit()
        .putString(key, value)
        .apply()
    }

    AsyncFunction("getString") { key: String ->
      val context = appContext.reactContext ?: return@AsyncFunction null
      val prefs = context.getSharedPreferences("todo_storage", Context.MODE_PRIVATE)

      prefs.getString(key, null)
    }

    AsyncFunction("delete") { key: String ->
      val context = appContext.reactContext ?: return@AsyncFunction
      val prefs = context.getSharedPreferences("todo_storage", Context.MODE_PRIVATE)

      prefs.edit()
        .remove(key)
        .apply()
    }
  }
}