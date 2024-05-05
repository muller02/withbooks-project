package kr.withbooks.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeCommentView {

    private Long id;
    private Long boardId;
    private Long userId;
    private String content;
    private LocalDateTime regDate;
    private String nickname;
    private String img;
    
}
