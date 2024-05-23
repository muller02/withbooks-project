package kr.withbooks.web.service;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;

import java.util.List;

public interface CalendarService {
  List<CalendarView> getEventsById(Long withId);

  Calendar saveEvent(Calendar calendar);

}
