package expo.modules.nativeheader

import android.content.Context
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class NativeHeaderView(
    context: Context,
    appContext: AppContext
) : ExpoView(context, appContext) {

    private val onInputChange by EventDispatcher<Map<String, String>>()
    private var userName: String = ""

    private val composeView = ComposeView(context).apply {
        layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.WRAP_CONTENT
        )
        setViewCompositionStrategy(
            ViewCompositionStrategy.DisposeOnDetachedFromWindow
        )
    }

    init {
        addView(composeView)
        render()
    }

    fun setUserName(value: String) {
        userName = value
        render()
    }

    private fun render() {
        composeView.setContent {
            NativeHeaderContent(
                userName = userName,
                onSendClick = { text ->
                    onInputChange(mapOf("text" to text))
                }
            )
        }
    }
}

@Composable
fun NativeHeaderContent(userName: String, onSendClick: (String) -> Unit) {
    var inputText by remember { mutableStateOf("") }

    MaterialTheme {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFFE0F2FE))
                .padding(horizontal = 20.dp, vertical = 20.dp)
        ) {
            
            Spacer(modifier = Modifier.height(12.dp))

            TextField(
                value = inputText,
                onValueChange = { inputText = it },
                placeholder = { Text("Kullanıcı adı girin...") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.White,
                    focusedIndicatorColor = Color(0xFF0369A1)
                ),
                shape = androidx.compose.foundation.shape.RoundedCornerShape(10.dp)
            )

            Spacer(modifier = Modifier.height(10.dp))

            Button(
                onClick = { 
                    if (inputText.isNotBlank()) {
                        onSendClick(inputText)
                        inputText = ""
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0369A1)),
                shape = androidx.compose.foundation.shape.RoundedCornerShape(10.dp)
            ) {
                Text("React Native'e gönder", color = Color.White)
            }
        }
    }
}