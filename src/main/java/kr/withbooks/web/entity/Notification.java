package kr.withbooks.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    private Long id;
    private Long notiStatusId;
    private Long userId;
    private LocalDateTime addDate;
    private int checkedYn;
    private int checkedDate;
}
