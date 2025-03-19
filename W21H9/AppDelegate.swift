//
//  AppDelegate.swift
//  W21H9
//
//  Created by Tvanomsok on 19.03.2025.
//

import Cocoa
import SafariServices

@main
@objc(AppDelegate)
class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: "com.apple.Safari.extension") { (state, error) in
            if let error = error {
                NSLog("Ошибка получения состояния расширения: \(error)")
            }
        }
    }
}
