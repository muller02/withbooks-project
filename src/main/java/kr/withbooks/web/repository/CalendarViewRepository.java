package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalTime;
import java.util.List;

@Mapper
public interface CalendarViewRepository {

  List<CalendarView> findByWithId(Long withId, LocalTime start, LocalTime end);

  Calendar save(Calendar calendar);
}
