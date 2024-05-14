package kr.withbooks.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/calendar")
public class CalendarController {

  @GetMapping("/list")
  public String list() {
    
    return "/calendar/list";
  }
}
