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
public class BooklogView {

    private Long id;
    private Long bookId;
    private Date regDate;
    private Integer publicYn;
    private String bookTitle;
    private String bookAuthor;
    private String bookCover;
    private String bookPublisher;
    
}
