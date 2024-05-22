package kr.withbooks.web.service;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImp implements CalendarService {

  @Autowired
  private CalendarRepository repository;

  @Override
  public List<Calendar> getList(Long withId) {
    repository.findAll(withId);
    return null;
  }
}
