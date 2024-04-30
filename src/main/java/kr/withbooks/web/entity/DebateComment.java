package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebateComment {

    private Long id;
    private Long boardId;
    private Long userId;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;

}
