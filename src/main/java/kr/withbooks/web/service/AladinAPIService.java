package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Book;

public interface AladinAPIService {

    public Integer getList(List<Book> list, Integer sort, String queryType, String query, String itemId, Integer page);
    public Book getByISBN13(String isbn13);
    
}
