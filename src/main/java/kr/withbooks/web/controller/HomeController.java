 package kr.withbooks.web.controller;

 import java.util.Collection;
 import java.util.Iterator;

 import org.springframework.security.core.Authentication;
 import org.springframework.security.core.GrantedAuthority;
 import org.springframework.security.core.annotation.AuthenticationPrincipal;
 import org.springframework.security.core.context.SecurityContextHolder;
 import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.stereotype.Controller;
 import org.springframework.ui.Model;

 import kr.withbooks.web.config.CustomUserDetails;
 import kr.withbooks.web.entity.User;
 import org.springframework.web.bind.annotation.GetMapping;


 @Controller
 public class HomeController {
    
     @GetMapping("/")
     public String home(Model model){


        
         return "home";
     }
    
 }
