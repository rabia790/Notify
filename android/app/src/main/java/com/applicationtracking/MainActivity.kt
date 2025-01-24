package com.applicationtracking

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.activity.ComponentActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "applicationtracking"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, DefaultNewArchitectureEntryPoint.fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        // Install the splash screen
             installSplashScreen()

        // Handle saved instance state to avoid fragment restoration issues
        if (savedInstanceState != null) {
            savedInstanceState.remove("android:support:fragments")
        }

        // Call the super method
        super.onCreate(savedInstanceState)

     

    }
}
