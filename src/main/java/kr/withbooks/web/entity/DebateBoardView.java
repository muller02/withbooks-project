package kr.withbooks.web.entity;

import java.util.Date;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
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
    private Date regDate;
    private Integer blindYn;
    private Long topicId;
    private String topic;
    private String img;
    private String nickname;
    private Long cmtCnt;
}
