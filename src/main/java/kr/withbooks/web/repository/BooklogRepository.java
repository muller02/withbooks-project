package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogView;

@Mapper
public interface BooklogRepository {

    List<BooklogView> findAll(Long userId);
    BooklogView findById(Long booklogId);

    void save(Booklog booklog);
    void update(Booklog booklog);
    void deleteBooklog(Long booklogId);
    void deleteAllByIds(List<Integer> ids, Long userId);

    int updatePublic(Long booklogId, Long publicYn);
    
}
