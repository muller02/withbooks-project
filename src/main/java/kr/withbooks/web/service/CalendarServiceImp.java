package kr.withbooks.web.service;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;
import kr.withbooks.web.repository.CalendarRepository;
import kr.withbooks.web.repository.CalendarViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImp implements CalendarService {

  @Autowired
  private CalendarViewRepository viewRepository;

  @Autowired
  private CalendarRepository repository;

  // 해당 위드의 이벤트들을 조회
  @Override
  public List<CalendarView> getEventsById(Long withId) {
    return viewRepository.findAllById(withId);
  }

  // 해당 위드에 이벤트를 등록
  @Override
  public Calendar saveEvent(Calendar calendar, Long userId) {
    calendar.setUserId(userId); // 캘린더 객체에 user_id 설정
    return repository.save(calendar);
  }
}
