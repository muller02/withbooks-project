package kr.withbooks.web.entity;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {
    private long id;
    private long userId;
    private long bookId;

}
