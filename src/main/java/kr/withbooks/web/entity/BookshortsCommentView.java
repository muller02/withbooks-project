package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookshortsCommentView {
    private long id;
    private long shortsId;
    private long userId;
    private String content;
    private LocalDateTime regDate;
    private String nickname;
}
