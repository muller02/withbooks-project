package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.BookView;

public interface BookService {
    List<BookView> getList();
    
    List<BookView> getList(String query);

    BookView get(Long id);


    
}
