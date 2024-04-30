package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DebateBoard {

    private Long id;
    private Long roomId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
    private Long topicId;

}
