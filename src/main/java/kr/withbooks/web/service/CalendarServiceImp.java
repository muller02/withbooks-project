package kr.withbooks.web.service;

import kr.withbooks.web.entity.CalendarView;
import kr.withbooks.web.repository.CalendarViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImp implements CalendarService {

  @Autowired
  private CalendarViewRepository repository;

  @Override
  public List<CalendarView> getEventsById(Long withId) {
    return repository.findAllById(withId);
  }

//  @Override
//  public Calendar saveEvent(Calendar calendar) {
//    return repository.save(calendar);
//  }
}
