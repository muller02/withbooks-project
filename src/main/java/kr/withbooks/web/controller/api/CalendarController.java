//package kr.withbooks.web.controller.api;
//
//import kr.withbooks.web.config.CustomUserDetails;
//import kr.withbooks.web.entity.Calendar;
//import kr.withbooks.web.service.CalendarService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalTime;
//import java.util.List;
//
//@RestController("apiCalendarController")
//@RequestMapping("/api/calendar")
//public class CalendarController {
//
//  @Autowired
//  private CalendarService service;
//
//  // 위드별 이벤트 조회
//  @GetMapping("/with")
//  public List<Calendar> getEvents(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam(name = "id") Long withId, @RequestParam LocalTime start, @RequestParam LocalTime end) {
//
//    Long userId = userDetails.getId();
//    return service.getEvents(withId, start, end);
//  }
//
//  // 새 이벤트 작성
//  @PostMapping
//  public Calendar addEvent(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Calendar calendar) {
//
//    Long userId = userDetails.getId();
//    return service.saveEvent(calendar);
//  }
//}
