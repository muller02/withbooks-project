package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class DebateRoomView {

    private Long id;
    private Long regId;
    private Long withId;
    private Long bookId;
    private String notice;
    private Integer deadline;
    private Date reserveDate;
    private Date regDate;
    private String title;
    private String author;
    private String cover;
    private Long boardCnt;
}
