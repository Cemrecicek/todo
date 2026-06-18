package expo.modules.nativeheader

import android.content.Context
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.LinearLayout
import expo.modules.kotlin.views.ExpoView

class CapacitorLoginView(context: Context, appContext: AppContext) : ExpoView(context, appContext){

    private val webView = WebView(context).apply {
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        webViewClient = WebViewClient()
        loadUrl("file:///android_asset/public/index.html")
    }

    init {

        layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT
        )
        
        webView.layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT
        )
        
        addView(webView)

        webView.addJavascriptInterface(object {
            @android.webkit.JavascriptInterface
            fun sendData(data: String) {
                appContext.modulesQueue.launch {
                    val module = appContext.registry.getModule("NativeHeader") as? NativeHeaderModule
                    module?.emitWebData(data)
                }
            }
        }, "AndroidInterface")
    }
}