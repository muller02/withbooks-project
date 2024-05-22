package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Calendar;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CalendarRepository {

  List<Calendar> findAll(Long withId);
}
