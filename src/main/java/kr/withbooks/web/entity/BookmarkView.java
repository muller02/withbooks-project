package kr.withbooks.web.entity;

import java.util.Date;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkView {

    private long id;
    private long bookId;
    private String title; 
    private String author; 
    private String cover;
    private Date pubDate;
    
}
