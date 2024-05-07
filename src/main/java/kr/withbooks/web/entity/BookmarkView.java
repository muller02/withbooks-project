package kr.withbooks.web.entity;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkView {

    private long id;
    private long bookId;
    private long userId;
    private String title; 
    private String author; 
    private String cover;
    private LocalDateTime pubDate;
    
}
