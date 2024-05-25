package kr.withbooks.web.repository;

import kr.withbooks.web.entity.CalendarView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CalendarViewRepository {

  // 위드 아이디에 해당하는 db값 불러오기
  List<CalendarView> findAllById(Long withId);
}
