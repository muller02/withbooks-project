package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeBoard {

    private Long id;
    private Long withId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private int blindYn;



}
