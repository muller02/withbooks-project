package kr.withbooks.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookView;

@Mapper
public interface BookViewRepository {

    List<BookView> findAll(String query, Long categoryId);

    BookView findById(Long id);

    // admin/book/list
    List<BookView> findAllByParams(Map<String, String> params, int size, int offset);
    int findCountByParams(Map<String, String> params, int size, int offset);

    // book/list
    List<BookView> findByParams(int offset, int size, String query, Long categoryId);
    int findCntByParams(int offset, int size, String query, Long categoryId);
}
