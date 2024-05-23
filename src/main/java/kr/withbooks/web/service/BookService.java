package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.Category;

public interface BookService {
    List<Book> getList();
    
    List<Book> getList(String query, Long categoryId, Long size, Long page);

    Book getById(Long bookId);

    Map<String, Object> getMapById(Long bookId, Long userId);

    List<Book> getListByParams(Map<String, String> params);

    int getCountByParams(Map<String, String> params);

    List<Book> getListByParams(int size, int page, String query, Long categoryId);

    int getCountByParams(int size, Integer page, String query, Long categoryId);

    Integer reg(List<Book> list, List<Category> categoryList);

    Integer getBestseller(Long bookId);

    Integer addBestseller(List<Long> ids);

    Integer deleteBestseller(List<Long> ids);

    Integer editBookPublicYn(Long bookId, Integer yn);

    Integer editBook(Long bookId, Integer price, String description, String purchaseLink);

    List<Book> getBestsellerList();

    List<Book> getNewList();


    


    
}
