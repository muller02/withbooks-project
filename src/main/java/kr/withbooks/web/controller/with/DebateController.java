package kr.withbooks.web.controller.with;

import kr.withbooks.web.entity.*;
import kr.withbooks.web.service.DebateRoomService;
import kr.withbooks.web.service.DebateTopicService;
import kr.withbooks.web.service.WithService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/with/debate")
public class DebateController {

    @Autowired
    private DebateRoomService service;

    @Autowired
    private WithService withService;

    @Autowired
    private DebateTopicService debateTopicService;




    @GetMapping("/list")
    public String list(Model model) {

        List<DebateRoomView> list  = service.getListById(1L);

        model.addAttribute("list", list);
        System.out.println("list: " + list);

        return "with/debate/list";
    }

    @PostMapping("/reg")
    public  String reg(@RequestParam(required = false) Long bookId,
                       @RequestParam(required = false) String reserveDate,
                       @RequestParam Integer deadline,
                       @RequestParam String notice,
                       @RequestParam(name = "wid" ) Long withId,
                       @RequestParam(name = "topic" ,required = false) String[] topic){

        // DateTimeFormatter를 사용하여 문자열을 LocalDateTime으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime parsedDatereserve = LocalDateTime.parse(reserveDate + " 00:00:00", formatter);




        With with = withService.get(withId);

        Long withRegId = with.getWithRegId();
        DebateRoom debateRoom =  DebateRoom.builder().regId(withRegId).bookId(bookId).reserveDate(parsedDatereserve).deadline(deadline).notice(notice).withId(withId).build();

        Long debateRoomId =  service.add(debateRoom);
        log.info("debateRoomId : {}", debateRoom);


        List<String> topicContentList = Arrays.asList(topic);

        for(int i =0 ; i< topicContentList.size(); i++) {
            DebateTopic debateTopic = DebateTopic.builder().roomId(debateRoomId).content(topicContentList.get(i)).build();
            debateTopicService.add(debateTopic);

        }



        return "redirect:/with/detail?id="+withId;
    }
    @GetMapping("/reg")
    public String regForm() {


        return "with/debate/reg";


    }
}
