package kr.withbooks.web.service;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;

import java.util.List;

public interface CalendarService {
  List<CalendarView> getEventsById(Long withId);

  // 해당 위드에 이벤트를 등록
  void saveEvent(Calendar calendar, Long userId);
}
