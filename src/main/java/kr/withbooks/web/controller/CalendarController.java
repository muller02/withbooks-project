package kr.withbooks.web.controller;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.CalendarView;
import kr.withbooks.web.entity.WithMember;
import kr.withbooks.web.service.CalendarService;
import kr.withbooks.web.service.WithMemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/calendar")
public class CalendarController {

  @Autowired
  private CalendarService service;
  @Autowired
  private WithMemberService withMemberService;

  @GetMapping("/index")
  public String list(@RequestParam(name = "wid") Long withId,
                     Model model,
                     @AuthenticationPrincipal CustomUserDetails userDetails) {

    List<CalendarView> list = service.getEventsById(withId);
    List<WithMember> withMembers = withMemberService.getWithMembers(withId);


    log.info("list : {}", list);
    log.info("withMembers : {}", withMembers);

    model.addAttribute("list", list);

    return "calendar/index";
  }
}
