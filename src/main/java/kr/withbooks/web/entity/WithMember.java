package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithMember {

    private Long withId;
    private Long memberId;
    private Long masterYn;
    private Long kickedYn;
    private LocalDateTime joinDate;

}
