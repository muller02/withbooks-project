package kr.withbooks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.entity.Notification;
import kr.withbooks.web.service.NotificationService;

@Controller
@RequestMapping("notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @GetMapping("list")
    public String list(
        // @AuthenticationPrincipal WebUserDetails userDetails,
        Model model){

        Long userId = 6L;
        // userId = userDetails.getId();

        //// 가져올 데이터//// 
        ////////////////////아 이렇게 따로 가져오면 안된다. 왜냐하면 알림 목록이기 때문에 view를 만들어야 한다.
        // 알림 메시지
        List<Notification> list = notificationService.getList(userId);
        // 위드인지 북쇼츠인지

        // 시간은 언제인지

        // 이미지

        return "notification/list";
    }
}
