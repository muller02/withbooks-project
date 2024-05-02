package kr.withbooks.web.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("profile")
public class ProfileController {
    
    @Autowired
    private UserService userService;

    @GetMapping("edit")
    public String editForm(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        Model model){

        Long userId = userDetails.getId();
        User user =  userService.getById(userId);
        
        model.addAttribute("user", user);

        return "profile/edit";
    }

    @PostMapping("edit")
    public String edit(
        String nickname,
        String intro,
        LocalDateTime birthDate,
        int gender,
        String email,
        @AuthenticationPrincipal CustomUserDetails userDetails,
        Model model
    ){

        Long id = userDetails.getId();

        User user = User
                    .builder()
                    .id(id)
                    .nickname(nickname)
                    .intro(intro)
                    .birthDate(birthDate)
                    .gender(gender)
                    .email(email)
                    .build();


        userService.modify(user);

        return "redirect:/profile/edit";
    }
}
