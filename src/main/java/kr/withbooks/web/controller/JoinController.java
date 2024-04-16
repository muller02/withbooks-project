package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.JoinService;
import kr.withbooks.web.service.JoinServiceImp;

@Controller
public class JoinController {

    @Autowired
    
    private JoinService service;
 
    @GetMapping("join")
    public String joinP(){


        return "join/join";
    }


    @PostMapping("/join")
    public String joinProcess(User user) {


    


      service.join(user);


        return "redirect:/login";
    }

}
