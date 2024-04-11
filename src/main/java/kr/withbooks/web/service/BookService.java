package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;

public interface BookService {
    List<BookView> getList();
    
    List<BookView> getList(String query);

    BookView getView(Long id);

    Book get(Long bookId);


    
}
