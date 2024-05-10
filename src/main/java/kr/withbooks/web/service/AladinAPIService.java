package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Book;

public interface AladinAPIService {

    public Integer getList(List<Book> list, Integer sort, String queryType, String query, String itemId, Integer page);
    public Integer getByISBN13(Book book, String isbn13);
    
}
