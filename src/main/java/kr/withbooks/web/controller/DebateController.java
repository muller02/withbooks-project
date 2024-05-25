package kr.withbooks.web.controller;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.*;
import kr.withbooks.web.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/debate")
public class DebateController {

    private final DebateRoomService debateRoomService;
    private final DebateTopicService debateTopicService;
    private final WithService withService;
    private final WithMemberService withMemberService;
    private final UserService userService;

    @GetMapping("/list")
    public String list(
            @RequestParam(name = "wid") Long withId,
            Model model,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        With with = withService.get(withId);
        Long withRegId = with.getWithRegId();

        List<DebateRoomView> list  = debateRoomService.getListById(withId);

        log.info("list : {}", list);

        Integer isWithMember = 0;
        if(userDetails != null)
            isWithMember = withMemberService.getJoinYn(withId, userDetails.getId());

        log.info("isWithMember : {}", isWithMember);

        User user = userService.getById(userDetails.getId());



        model.addAttribute("list", list);
        model.addAttribute("isWithMember", isWithMember);
        model.addAttribute("user", user);
        model.addAttribute("withRegId", withRegId);

        return "debate/list";
    }

    @GetMapping("/reg")
    public String regForm() {
        return "debate/reg";
    }

    @PostMapping("/reg")
    public  String reg(@RequestParam(required = false) Long bookId,
                       @RequestParam(required = false) String reserveDate,
                       @RequestParam Integer deadline,
                       @RequestParam String notice,
                       @RequestParam(name = "wid" ) Long withId,
                       @RequestParam(name = "topic", required = false) String[] topic){

        // DateTimeFormatter를 사용하여 문자열을 LocalDateTime으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime parsedDatereserve = LocalDateTime.parse(reserveDate + " 00:00:00", formatter);

        log.info("withId : {}", withId);

        With with = withService.get(withId);

        Long withRegId = with.getWithRegId();
        DebateRoom debateRoom =  DebateRoom.builder().regId(withRegId).bookId(bookId).reserveDate(parsedDatereserve).deadline(deadline).notice(notice).withId(withId).build();

        Long debateRoomId =  debateRoomService.add(debateRoom);
        log.info("debateRoomId : {}", debateRoomId);

        List<String> topicContentList = Arrays.asList(topic);

        for (String topicContent : topicContentList) {
            DebateTopic debateTopic = DebateTopic.builder().roomId(debateRoomId).content(topicContent).build();
            debateTopicService.add(debateTopic);
        }

        return "redirect:/with/detail?id=" + withId;
    }

    @PostMapping("/deleteAll")
    public String deleteAll(
            @RequestParam(name = "wid") Long withId,
            @RequestParam(name = "ids") List<Long> ids) {

        log.info("ids : {}", ids.size());
        log.info("withId : {}", withId);
        debateRoomService.deleteAll(withId, ids);

        return "redirect:/debate/list?wid=" + withId;
    }

}
