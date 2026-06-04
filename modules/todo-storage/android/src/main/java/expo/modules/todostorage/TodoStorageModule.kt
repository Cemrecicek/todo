package expo.modules.todostorage

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.functions.Coroutine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

private val Context.todoDataStore by preferencesDataStore(name = "todo_storage")

class TodoStorageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TodoStorage")

    AsyncFunction("set") Coroutine { key: String, value: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      val preferenceKey = stringPreferencesKey(key)

      context.todoDataStore.edit { preferences ->
        preferences[preferenceKey] = value
      }
    }

    AsyncFunction("getString") Coroutine { key: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      val preferenceKey = stringPreferencesKey(key)

      context.todoDataStore.data
        .map { preferences ->
          preferences[preferenceKey]
        }
        .first()
    }

    AsyncFunction("delete") Coroutine { key: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")

      val preferenceKey = stringPreferencesKey(key)

      context.todoDataStore.edit { preferences ->
        preferences.remove(preferenceKey)
      }
    }
  }
}