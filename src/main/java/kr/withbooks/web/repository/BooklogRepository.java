package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BooklogView;

@Mapper
public interface BooklogRepository {

    List<BooklogView> findAll(Long id);
    BooklogView findById(Long id);
    void deleteAllByIds(List<Integer> ids, Long userId);
    
}
