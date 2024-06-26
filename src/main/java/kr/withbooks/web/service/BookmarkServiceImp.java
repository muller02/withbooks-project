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
    public List<BookmarkView> getList(Integer p,Long userId) {
        return repository.findAll(p,userId);
    }

    @Override
    public void deleteAllByIds(List<Integer> ids, Long userId) {

        repository.deleteAllByIds(ids, userId);
    }
    @Override
    public int add(Long bookId, Long userId) {
        return repository.save(bookId, userId);
    }
    
    @Override
    public int delete(Long bookId, Long userId) {
        return repository.delete(bookId, userId);
    }
}
