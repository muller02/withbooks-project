package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookshorts {

    private Long id;
    private Long bookId;
    private Long userId;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;
}
