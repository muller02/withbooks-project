package kr.withbooks.web.controller;


import java.util.Enumeration;

import jakarta.servlet.http.HttpServletResponse;
import kr.withbooks.web.config.CustomUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @GetMapping("login")
    public  String login(HttpServletRequest request , HttpServletResponse response, @AuthenticationPrincipal CustomUserDetails userDetails){

        if(userDetails !=null)
            return "redirect:/shorts/list";


        return  "login/login";
    }

  

}