package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogView;

public interface BooklogService {

    List<BooklogView> getList(Long id);

    BooklogView getById(Long id);

    void add(Booklog bookLog);
    void delete(Long booklogId);
    void update(Booklog booklog);

    void deleteAllByIds(List<Integer> ids, Long userId);
    
}
