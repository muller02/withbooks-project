package kr.withbooks.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class LoginController {

    @GetMapping("login")
    public  String login(){

        return  "login/login";
    }

    @GetMapping("join")
    public String join(){


        return "login/join";
    }
}