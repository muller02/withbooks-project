package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookmarkView;

@Mapper
public interface BookmarkRepository {
    List<BookmarkView> findAll(Integer p);

    void deleteAllByIds(List<Integer> ids, Long userId);

    int save(Long bookId, Long userId);

    int delete(Long bookId, Long userId);
}
