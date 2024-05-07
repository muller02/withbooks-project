package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.repository.BookRepository;
import kr.withbooks.web.repository.BookViewRepository;

@Service
public class BookServiceImp implements BookService {

    @Autowired
    BookRepository repository;

    @Autowired
    BookViewRepository viewRepository;

    @Override
    public List<BookView> getList() {
        return viewRepository.findAll(null, null);
    }

    @Override
    public List<BookView> getList(String query, Long categoryId) {


        return    viewRepository.findAll(query,categoryId);
    }


    //=====================================================================
    // book/list
    @Override
    public List<BookView> getListByParams(int size, int page, String query, Long categoryId) {
        int offset = (page-1)*size;
       return viewRepository.findByParams(offset, size, query, categoryId);
    }

    @Override
    public int getCountByParams(int size, Integer page, String query, Long categoryId) {
       int offset = (page-1)*size;
       return viewRepository.findCntByParams(offset, size, query, categoryId);
    }
    //=====================================================================



    @Override
    public BookView getView(Long id) {
        BookView book = viewRepository.findById(id);

        return book;
    }

    @Override
    public Book get(Long bookId) {
        return repository.findById(bookId);
        
    }


    @Override
    public Map<String, Object> getMapById(Long bookId, Long userId) {
        return repository.findMapById(bookId, userId);
    }





    //=====================================================================
    // admin/book/list
    @Override
    public List<BookView> getListByParams(Map<String, String> params) {
        int size = 20;
        int page = Integer.parseInt(params.get("page"));
        int offset = (page-1)*size;

        return viewRepository.findAllByParams(params, size, offset);
    }
    
    @Override
    public int getCountByParams(Map<String, String> params) {
        int size = 20;
        int page = Integer.parseInt(params.get("page"));
        int offset = (page-1)*size;
        return viewRepository.findCountByParams(params, size, offset);
    }
     //=====================================================================
}
