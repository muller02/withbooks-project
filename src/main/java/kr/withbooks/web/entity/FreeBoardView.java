package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FreeBoardView {

    private Long id;
    private Long withId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
    private String nickname;
    private int commentCnt;
    private int likeCnt;
    private List<String> img;


}
