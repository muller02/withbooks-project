package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WithMemberView {
    private Long withId;
    private Long memberId;
    private int masterYn;
    private int kickYn;
    private LocalDateTime joinDate;
    private  String nickName;
    private  String img;

}
