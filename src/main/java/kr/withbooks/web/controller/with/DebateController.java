package kr.withbooks.web.controller.with;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.*;
import kr.withbooks.web.service.DebateRoomService;
import kr.withbooks.web.service.DebateTopicService;
import kr.withbooks.web.service.WithService;
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
@RequestMapping("/with/debate")
public class DebateController {

    private final DebateRoomService debateRoomService;
    private final DebateTopicService debateTopicService;
    private final WithService withService;

    @GetMapping("/list")
    public String list(
            @RequestParam(name = "wid") Long withId,
            Model model,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        List<DebateRoomView> list  = debateRoomService.getListById(withId);

        log.info("list : {}", list);

        model.addAttribute("list", list);

        return "with/debate/list";
    }

    @GetMapping("/reg")
    public String regForm() {
        return "with/debate/reg";
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

}
