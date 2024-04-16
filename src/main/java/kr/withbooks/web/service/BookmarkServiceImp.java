package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.BookmarkView;
import kr.withbooks.web.repository.BookmarkRepository;

@Service
public class BookmarkServiceImp implements BookmarkService {
    
    @Autowired
    private BookmarkRepository repository;

    @Override
    public List<BookmarkView> getList(Integer p) {
        return repository.findAll(p);
    }
    
}
