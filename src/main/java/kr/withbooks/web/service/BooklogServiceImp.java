package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogView;
import kr.withbooks.web.repository.BooklogRepository;

@Service
public class BooklogServiceImp implements BooklogService{

    @Autowired
    private BooklogRepository repository;

    @Override
    public List<BooklogView> getList(Long id) {
        
        List<BooklogView> list = repository.findAll(id);

        return list;
    }

    @Override
    public BooklogView getById(Long id) {

        BooklogView log = repository.findById(id);

        return log;
    }

    @Override
    public void add(Booklog booklog) {
    }

    @Override
    public void delete(Long booklogId) {
    }

    @Override
    public void update(Booklog bookLog) {
    }
    
}
