package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Calendar;
import kr.withbooks.web.entity.CalendarView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CalendarRepository {

  List<CalendarView> findAllById(Long withId);

  Calendar save(Calendar calendar);

}
