package com.anonymous.todo

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import expo.modules.todostorage.TodoDataStoreManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LauncherActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val layout = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      gravity = Gravity.CENTER
      setPadding(40, 40, 40, 40)
    }

    val title = TextView(this).apply {
      text = "Kotlin Native Ekran"
      textSize = 28f
      gravity = Gravity.CENTER
    }

    val nameInput = EditText(this).apply {
      hint = "İsminizi giriniz"
      textSize = 18f
    }

    val button = Button(this).apply {
      text = "React Native Sayfasını Aç"

      setOnClickListener {
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

    layout.addView(title)
    layout.addView(nameInput)
    layout.addView(button)

    setContentView(layout)
  }
}