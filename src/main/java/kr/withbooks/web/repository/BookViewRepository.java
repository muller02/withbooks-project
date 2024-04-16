package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookView;

@Mapper
public interface BookViewRepository {

    List<BookView> findAll(String query, Long categoryId);

    BookView findById(Long id);
}
