package kr.withbooks.web.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;


@Controller("adminUserController")
@RequestMapping("admin/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "id", required = false) Long id
        ,@RequestParam(name = "nickname", required = false) String nickname
        ,@RequestParam(name = "email", required = false) String email
        ,@RequestParam(name = "gender", required = false) Integer gender
        ,@RequestParam(name = "status", required = false) String status
        ,@RequestParam(name = "birthyear", required = false) String birthyear
        ,Model model
    ) {

        System.out.println("birthyear : "+birthyear);

        model.addAttribute("id", id);
        model.addAttribute("nickname", nickname);
        model.addAttribute("email", email);
        model.addAttribute("gender", gender);
        model.addAttribute("status", status);
        model.addAttribute("birthyear", birthyear);

        // List<User> list = service.get();  

        return "admin/user/list";
    }
    
    
}
