package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.repository.BookRepository;

@Service
public class BookServiceImp implements BookService {

    @Autowired
    BookRepository repository;

    @Override
    public List<Book> getList() {
        return repository.findAll(null, null);
    }

    @Override
    public List<Book> getList(String query, Long categoryId) {


        return repository.findAll(query,categoryId);
    }


    //=====================================================================
    // book/list
    @Override
    public List<Book> getListByParams(int size, int page, String query, Long categoryId) {
        int offset = (page-1)*size;
       return repository.findByParams(offset, size, query, categoryId);
    }

    @Override
    public int getCountByParams(int size, Integer page, String query, Long categoryId) {
       int offset = (page-1)*size;
       return repository.findCntByParams(offset, size, query, categoryId);
    }
    //=====================================================================



    @Override
    public Book getById(Long id) {
        Book book = repository.findById(id);

        return book;
    }


    @Override
    public Map<String, Object> getMapById(Long bookId, Long userId) {
        return repository.findMapById(bookId, userId);
    }





    //=====================================================================
    // admin/book/list
    @Override
    public List<Book> getListByParams(Map<String, String> params) {
        int size = 20;
        int page = Integer.parseInt(params.get("page"));
        int offset = (page-1)*size;

        return repository.findAllByParams(params, size, offset);
    }
    
    @Override
    public int getCountByParams(Map<String, String> params) {
        int size = 20;
        int page = Integer.parseInt(params.get("page"));
        int offset = (page-1)*size;
        return repository.findCountByParams(params, size, offset);
    }
     //=====================================================================
}
