package com.anonymous.todo

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class LauncherActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val layout = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      gravity = Gravity.CENTER
      setPadding(40, 40, 40, 40)
    }

    val title = TextView(this).apply {
      text = "Kotlin Native Ekranına Hoşgeldiniz!"
      textSize = 28f
      gravity = Gravity.CENTER
    }

    val button = Button(this).apply {
      text = "To Do App Aç"

      setOnClickListener {
        // val intent = Intent(this@LauncherActivity, MainActivity::class.java) dev clientda çalışrken bu şekilde once expo dev launcher açılıyor o yüzden bunu kullanmayıp Expo Dev Client deep link ekledim
        val devClientUrl =
          "exp+todo://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8081"

         val intent = Intent(Intent.ACTION_VIEW, Uri.parse(devClientUrl)).apply {
            setPackage(packageName)
}
        startActivity(intent)
        finish()
      }
    }

    layout.addView(title)
    layout.addView(button)

    setContentView(layout)
  }
}