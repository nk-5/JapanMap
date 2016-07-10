//
//  ViewController.swift
//  JapanMap
//
//  Created by 中川 慶悟 on 2016/07/10.
//  Copyright © 2016年 中川 慶悟. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController {

    var JapanMap: WKWebView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //3.WebKitのインスタンス作成!
        self.JapanMap = WKWebView()
        
        //4.ここでWebKitをviewに紐付け
        self.view = self.JapanMap
        
        //5.URL作って、表示させる！
//        let urlString = "https://google.co.jp/"
        let urlString = "http://dotinstall.com/"
        let encodedUrlString = urlString.stringByAddingPercentEncodingWithAllowedCharacters( NSCharacterSet.URLQueryAllowedCharacterSet() )
        
        let url = NSURL(string:encodedUrlString!)
        let req = NSURLRequest(URL:url!)
        self.JapanMap!.loadRequest(req)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

