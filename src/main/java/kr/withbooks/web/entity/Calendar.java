package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calendar {
  private Long id;
  private String content; // 일정 내용
  private LocalDateTime start_date;
  private LocalDateTime end_date;
  private String location;
}