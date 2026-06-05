package expo.modules.todostorage

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

private val Context.todoDataStore by preferencesDataStore(name = "todo_storage")

object TodoDataStoreManager {
  suspend fun setString(context: Context, key: String, value: String) {
    val preferenceKey = stringPreferencesKey(key)

    context.applicationContext.todoDataStore.edit { preferences ->
      preferences[preferenceKey] = value
    }
  }

  suspend fun getString(context: Context, key: String): String? {
    val preferenceKey = stringPreferencesKey(key)

    return context.applicationContext.todoDataStore.data
      .map { preferences ->
        preferences[preferenceKey]
      }
      .first()
  }

  suspend fun delete(context: Context, key: String) {
    val preferenceKey = stringPreferencesKey(key)

    context.applicationContext.todoDataStore.edit { preferences ->
      preferences.remove(preferenceKey)
    }
  }
}