package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import kr.withbooks.web.entity.Book;

public interface AladdinAPIService {

    public Map<String, Object> getList(List<Book> list, Integer sort, String queryType, String query, String itemId, Integer page);
    public Book getByISBN13(String isbn13);
    
}
