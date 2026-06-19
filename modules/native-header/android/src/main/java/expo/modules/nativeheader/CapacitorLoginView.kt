package expo.modules.nativeheader

import android.content.Context
import android.webkit.WebChromeClient // Bunu ekledik
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.LinearLayout
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kotlinx.coroutines.launch

class CapacitorLoginView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

    private val webView = WebView(context).apply {
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        webViewClient = WebViewClient()
        webChromeClient = WebChromeClient() 
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

        class WebAppInterface {
            @android.webkit.JavascriptInterface
            fun sendData(data: String) {
                appContext.mainQueue.launch {
                    val module = appContext.registry.getModule("NativeHeader") as? NativeHeaderModule
                    module?.emitWebData(data)
                }
            }
            
            @android.webkit.JavascriptInterface
            fun sendToKotlin(wrapper: String) {
                appContext.mainQueue.launch {
                    val module = appContext.registry.getModule("NativeHeader") as? NativeHeaderModule
                    module?.emitWebData(wrapper)
                }
            }
        }

        val bridge = WebAppInterface()
        webView.addJavascriptInterface(bridge, "AndroidInterface")
        webView.addJavascriptInterface(bridge, "AndroidBridge")
    }
}