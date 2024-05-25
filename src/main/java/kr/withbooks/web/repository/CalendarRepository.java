package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Calendar;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CalendarRepository {

  // 캘린더에 이벤트 저장하기
  void save(Calendar calendar);

  Calendar findById(Long id);


}
