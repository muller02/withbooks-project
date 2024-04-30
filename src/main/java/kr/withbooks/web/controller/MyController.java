package kr.withbooks.web.controller;

import kr.withbooks.web.config.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.NotificationService;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("/my")
public class MyController {

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;
    
    @GetMapping("/index")
    public String index(
        // @AuthenticationPrincipal WebUserDetails userDetails,
        @AuthenticationPrincipal CustomUserDetails userDetails,
        Model model){


        Long userId = userDetails.getId();

        // userId = userDetails.getId();
        User user = userService.getById(userId);

        int notiCnt = notificationService.getNotiCount(userId);
        
        model.addAttribute("user", user);
        model.addAttribute("notiCnt", notiCnt);

        return "/my/index.html";
    }
}
