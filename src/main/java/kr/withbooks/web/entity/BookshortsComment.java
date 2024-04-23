package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookshortsComment {

    private Long id;
    private Long shortsId;
    private Long userId;
    private String content;
    private LocalDateTime regDate;

}
