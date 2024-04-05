package kr.withbooks.web.service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImp implements BookService {

    @Autowired
    BookRepository repository;

    @Override
    public List<Book> getList() {


        return getList(null);
    }

    @Override
    public List<Book> getList(String query) {
        List<Book> list = repository.findAll(query);


        return list;
    }


    @Override
    public Book get(Long id) {
        Book book = repository.findById(id);

        return book;
    }


}
