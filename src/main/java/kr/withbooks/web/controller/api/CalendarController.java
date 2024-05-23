package kr.withbooks.web.controller.api;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.CalendarView;
import kr.withbooks.web.service.CalendarService;
import kr.withbooks.web.service.WithMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiCalendarController")
@RequestMapping("/api/calendar")
public class CalendarController {

  @Autowired
  private CalendarService service;
  @Autowired
  private WithMemberService withMemberService;

  // 위드별 이벤트 조회
  @GetMapping("/events")
  public List<CalendarView> events(@RequestParam(name = "wid") Long withId,
                                   Model model,
                                   @AuthenticationPrincipal CustomUserDetails userDetails) {

    return service.getEventsById(withId);
  }

//  // 새 이벤트 작성
//  @PostMapping
//  public Calendar addEvent(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Calendar calendar) {
//
//    Long userId = userDetails.getId();
//    return service.saveEvent(calendar);
//  }
}
