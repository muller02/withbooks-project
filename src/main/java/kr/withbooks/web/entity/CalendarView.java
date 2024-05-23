package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarView {
  private Long id;
  private Long withId;
  private LocalTime startDateTime;
  private LocalTime endDateTime;
  private String content; // 일정 내용
  private String location;
}
