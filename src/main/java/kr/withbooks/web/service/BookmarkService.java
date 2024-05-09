package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.BookmarkView;

public interface BookmarkService {

    List<BookmarkView> getList(Integer p, Long userId);

    void deleteAllByIds(List<Integer> ids, Long userId);

    int add(Long bookId, Long userId);

    int delete(Long bookId, Long userId);
    
}
