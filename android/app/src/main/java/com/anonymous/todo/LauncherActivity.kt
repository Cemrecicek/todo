package com.anonymous.todo
import android.util.Log
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

class LauncherActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContent {
      LauncherScreen(
        onOpenReactNative = { name ->
          openReactNative(name)
        }
      )
    }
  }

  private fun openReactNative(name: String) {
    Log.d("LauncherActivity", "Kullanıcı: $name")
    
    val encodedName = Uri.encode(name)

    val devClientUrl =
      "exp+todo://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8081%2F%3FuserName%3D$encodedName"

    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(devClientUrl)).apply {
      setPackage(packageName)
    }

    startActivity(intent)
    finish()
  }
}