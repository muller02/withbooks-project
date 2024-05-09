package kr.withbooks.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BooklogLogs {
    
    private Long id;
    private String content;
    private String img;
    private LocalDateTime regDate;
    private Long booklogId;
}
