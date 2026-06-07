package com.anonymous.todo

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import expo.modules.todostorage.TodoDataStoreManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LauncherActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContentView(R.layout.activity_launcher)

    val nameInput = findViewById<EditText>(R.id.nameInput)
    val openReactButton = findViewById<Button>(R.id.openReactButton)

    openReactButton.setOnClickListener {
      val name = nameInput.text.toString().trim()

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
}