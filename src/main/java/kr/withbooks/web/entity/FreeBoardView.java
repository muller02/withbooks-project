package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeBoardView {

    private Long id;
    private Long withId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
    private int noticeYn;
    private String nickname;
    private String userImg;
    private int likeCnt;
    private int commentCnt;
    
    private List<String> imgs;

}
