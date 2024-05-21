package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebateBoardView {
    
    private Long id;
    private Long roomId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
    private Long topicId;
    private String topic;
    private String originalImg;
    private String saveImg;
    private String nickname;
    private String userImg;
    private Long cmtCnt;
}
