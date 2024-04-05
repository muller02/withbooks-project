package kr.withbooks.web.service;

import kr.withbooks.web.entity.Book;

import java.util.List;

public interface BookService {
    List<Book> getList();

    Book get(Long id);

    List<Book> getList(String query);

    
}
