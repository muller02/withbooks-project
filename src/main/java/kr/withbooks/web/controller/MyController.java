package kr.withbooks.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/my")
public class MyController {
    
    @GetMapping("/index")
    public String index(){
        // 유저정보 넘기기
        return "/my/index.html";
    }
}
