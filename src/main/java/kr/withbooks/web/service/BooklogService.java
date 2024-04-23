package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.entity.BooklogView;

public interface BooklogService {

    // Booklog
    List<BooklogView> getList(Long id);
    BooklogView getById(Long id);

    void reg(Booklog bookLog);
    void delete(Long booklogId);
    void update(Booklog booklog);

    // BooklogLogs
    List<BooklogLogs> getLogs(Long id);
    
    void addLogs(BooklogLogs logs);
    
    void deleteAllByIds(List<Integer> ids, Long userId);




    
}
