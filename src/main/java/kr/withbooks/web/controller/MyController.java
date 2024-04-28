package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("/my")
public class MyController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/index")
    public String index(
        // @AuthenticationPrincipal WebUserDetails userDetails,
        Model model){
        
        Long userId = 6L;
        // userId = userDetails.getId();
        User user = userService.getById(userId);

        // 근데 유저의 알림의 수를  NotificationService 에게 얻어오는게 맞나? 유저의 알림 관련이니까 UserService에서 해야하는거 아닌가?
        // 그래서 NotificationService대신 UserService에게 얻어왔다.(질문 후 수정필요하면 수정하자)
        // int notiCnt = notificationService.getNotiCount();
        int notiCnt = userService.getNotiCount(userId);
        
        model.addAttribute("user", user);
        model.addAttribute("notiCnt", notiCnt);

        return "/my/index.html";
    }
}