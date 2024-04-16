package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.repository.BookRepository;
import kr.withbooks.web.repository.BookViewRepository;

@Service
public class BookServiceImp implements BookService {

    @Autowired
    BookRepository repository;

    @Autowired
    BookViewRepository viewRepository;

    @Override
    public List<BookView> getList() {
        return viewRepository.findAll(null, null);
    }

    @Override
    public List<BookView> getList(String query, Long categoryId) {
        return viewRepository.findAll(query, categoryId);
    }


    @Override
    public BookView getView(Long id) {
        BookView book = viewRepository.findById(id);

        return book;
    }

    @Override
    public Book get(Long bookId) {
        return repository.findById(bookId);
        
    }


}
