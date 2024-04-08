package kr.withbooks.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookView {
    private long id;
    private String title;
    private String purchaseLink;
    private String author;
    private Date pubDate;
    private String description;
    private String isbn13;
    private int price;
    private String cover;
    private long categoryId;
    private String publisher;
    private String categoryName;
}
