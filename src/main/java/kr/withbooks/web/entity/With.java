package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class With {
    private Long id;
    private Boolean blindYn;
    private Long withRegId;
    private Boolean faceYn; // 대면여부
    private String name;
    private String intro;
    private String img;
    private int interval; // 모임주기
    private String location;
    private int personnel;// 정원
    private LocalDateTime regDate;

}
