package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DebateRoom {

    private Long id;
    private Long regId;
    private Long withId;
    private Long bookId;
    private String notice;
    private Integer deadline;
    private LocalDateTime reserveDate;
    private LocalDateTime regDate;
}
