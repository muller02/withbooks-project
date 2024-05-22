package kr.withbooks.web.service;

import kr.withbooks.web.entity.Calendar;

import java.util.List;

public interface CalendarService {
  List<Calendar> getList(Long withId);
}
