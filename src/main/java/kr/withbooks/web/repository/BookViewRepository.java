package kr.withbooks.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookView;

@Mapper
public interface BookViewRepository {

    List<BookView> findAll(String query, Long categoryId);

    BookView findById(Long id);

    List<BookView> findAllByParams(Map<String, String> params, int size, int offset);

    int findCountByParams(Map<String, String> params, int size, int offset);
}
