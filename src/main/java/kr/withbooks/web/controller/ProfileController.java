package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("profile")
public class ProfileController {
    
    @Autowired
    private UserService userService;

    @GetMapping("edit")
    public String edit(
        // @AuthenticationPrincipal WebUserDetails userDetails,
        Model model){

        Long userId = 6L;
        // userId = userDetails.getId();
        User user =  userService.getById(userId);
        
        model.addAttribute("user", user);
        System.out.println(user);

        return "profile/edit";
    }
}
