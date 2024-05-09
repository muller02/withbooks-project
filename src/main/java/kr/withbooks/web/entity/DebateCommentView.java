package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DebateCommentView {

    private Long id;
    private Long boardId;
    private Long userId;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
    private String userNickname;
    private String userImg;
}
