package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookshortsView {
    private long id;
    private long bookId;
    private long userId;
    private String content;

    private LocalDateTime regDate;
    private int blindYn;
    private List<String> img;
    private int likeCnt;
    private int commentCnt;
    private String userNickname;
    private String userImg;
    private String bookTitle;
    private String liked;
}
