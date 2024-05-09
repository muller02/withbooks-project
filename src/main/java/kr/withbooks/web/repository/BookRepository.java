package kr.withbooks.web.repository;

import kr.withbooks.web.entity.Book;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BookRepository {

    List<Book> findAll(String query, Long categoryId);

    Book findById(Long id);

    Map<String, Object> findMapById(Long bookId, Long userId);

    // admin/book/list
    List<Book> findAllByParams(Map<String, String> params, int size, int offset);
    int findCountByParams(Map<String, String> params, int size, int offset);

    // admin/book/aladinList
    int findBoolByISBN13(String isbn13);

    // book/list
    List<Book> findByParams(int offset, int size, String query, Long categoryId);
    int findCntByParams(int offset, int size, String query, Long categoryId);


} 
