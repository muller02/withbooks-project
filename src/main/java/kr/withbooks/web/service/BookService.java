package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;

public interface BookService {
    List<BookView> getList();
    
    List<BookView> getList(String query, Long categoryId);

    BookView getView(Long id);

    Book get(Long bookId);

    Map<String, Object> getMapById(Long bookId, Long userId);


    
}
