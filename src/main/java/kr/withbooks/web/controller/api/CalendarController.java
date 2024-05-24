package kr.withbooks.web.controller.api;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;
import kr.withbooks.web.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiCalendarController")
@RequestMapping("/api/calendar")
public class CalendarController {

  @Autowired
  private CalendarService service;

  // 위드별 이벤트 조회
  @GetMapping("/events")
  public List<CalendarView> events(@RequestParam(name = "wid") Long withId,
                                   Model model,
                                   @AuthenticationPrincipal CustomUserDetails userDetails) {

    return service.getEventsById(withId);
  }

  // 새 이벤트 작성
  @PostMapping
  public Calendar addEvent(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Calendar calendar) {
    Long userId = userDetails.getId();
    calendar.setUserId(userId); // userId를 calendar 객체에 설정

    System.out.println("Received calendar event: " + calendar); // 로그 추가
    return service.saveEvent(calendar, userId);
  }
}
