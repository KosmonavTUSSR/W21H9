//
//  SafariExtensionViewController.swift
//  W21H9 Extension
//
//  Created by Tvanomsok on 19.03.2025.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
