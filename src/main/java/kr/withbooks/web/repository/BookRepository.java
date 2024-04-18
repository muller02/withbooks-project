package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Book;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BookRepository {

    List<Book> findAll(String query);

    Book findById(Long id);

    Map<String, Object> findMapById(Long bookId, Long userId);
} 
