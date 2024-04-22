package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booklog {

    private Long id;
    private Long userId;
    private Long bookId;
    private LocalDateTime regDate;
    
}
