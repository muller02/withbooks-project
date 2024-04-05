package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Book;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookRepository {

    List<Book> findAll(String query);

    Book findById(Long id);
} 
