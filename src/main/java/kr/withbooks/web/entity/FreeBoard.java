package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FreeBoard {

    private Long id;
    private Long withId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;



}
