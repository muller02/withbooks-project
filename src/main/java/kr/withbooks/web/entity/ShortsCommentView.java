package kr.withbooks.web.entity;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShortsCommentView {
    private long id;
    private long shortsId;
    private long userId;
    private String content;
    private Date regDate;
    private String nickname;
}
