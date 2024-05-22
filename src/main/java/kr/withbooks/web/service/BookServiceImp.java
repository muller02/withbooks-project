package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.repository.BookRepository;

@Service
public class BookServiceImp implements BookService {

    @Autowired
    BookRepository repository;

    @Override
    public List<Book> getList() {
        return repository.findAll(null, null, null, null);
    }

    @Override
    public List<Book> getList(String query, Long categoryId, Long size, Long page) {
        
        Long offset = null; 
        if(page!=null)
            offset = (page-1)*size;

        return repository.findAll(query,categoryId, offset, size);
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
    @Override
    public Integer getBestseller(Long bookId) {
        return repository.findBestseller(bookId);
    }

    @Override
    public Integer addBestseller(List<Long> ids) {
        return repository.saveBestseller(ids);
    }

    @Override
    public Integer deleteBestseller(List<Long> ids) {
        return repository.deleteBestseller(ids);
    }

    @Override
    public Integer editBookPublicYn(Long bookId, Integer yn) {
        return repository.updateBookPublicYn(bookId, yn);
    }
    @Override
    public Integer editBook(Long bookId, Integer price, String description, String purchaseLink){
        return repository.updateBook(bookId, price, description, purchaseLink);
    }


     //=====================================================================

     //admin/book/aladinList
     @Override
     public Integer reg(List<Book> list, List<Category> categoryList) {

        for (Book book : list) {
            String categoryName = book.getCategoryName();
            String[] categoryNameArr = categoryName.split(">");
            String categoryNameToId = categoryNameArr[1];
            long categoryId = 0;
            for (Category c : categoryList) {
                String cidName = c.getName();
                long id = c.getId();
                if(cidName.equals(categoryNameToId)){
                    categoryId = id;
                    break;
                }
            }
            categoryId = categoryId==0 ? 20 : categoryId;
            book.setCategoryId(categoryId);
        }

         return repository.save(list);
     }
     // ===================================================================

     // ===================================================================
     // home

     @Override
     public List<Book> getBestsellerList() {
         return repository.findAllBestseller();
     }

     @Override
     public List<Book> getNewList() {
         return repository.findAllNew();
     }


}
