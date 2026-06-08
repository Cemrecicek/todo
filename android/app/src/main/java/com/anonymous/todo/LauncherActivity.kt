package com.anonymous.todo

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import expo.modules.todostorage.TodoDataStoreManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LauncherActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContent {
      LauncherScreen(
        onOpenReactNative = { name ->
          saveNameAndOpenReactNative(name)
        }
      )
    }
  }

  private fun saveNameAndOpenReactNative(name: String) {
    CoroutineScope(Dispatchers.IO).launch {
      TodoDataStoreManager.setString(
        applicationContext,
        "userName",
        name
      )

      runOnUiThread {
        val devClientUrl =
          "exp+todo://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8081"

        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(devClientUrl)).apply {
          setPackage(packageName)
        }

        startActivity(intent)
        finish()
      }
    }
  }
}