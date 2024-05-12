package kr.withbooks.web.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.service.AladinAPIService;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.CategoryService;

@RestController("apiBookController")
@RequestMapping("api/book")
public class BookController {

    @Autowired
    private BookService service;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AladinAPIService apiService;

    // ======================================================================
    // mariaDB
    @GetMapping("detail")
    public Book detail(Long id){

        System.out.println("id = "+id);
        Book book = service.getById(id);
        return book;
    }

    // 북쇼츠, 북로그 등 책검색
    @GetMapping("list")
    public List<Book> list(
                                @RequestParam(name = "q", required = false) String query
                                ,@RequestParam(name = "c", required = false) Long categoryId
                                ,@RequestParam(name = "s", required = false) Long size
                                ,@RequestParam(name = "p", required = false) Long page
                                ) {

        // 카테고리 선택하지 않고 책 검색 시 0으로 보내는 값을 null로 처리
       if(categoryId == 0)
           categoryId=null;

        List<Book> list = service.getList(query, categoryId);
        System.out.println("list : " + list);

        return list;

    }
    // =====================================================================

    // =====================================================================
    // aladdin API
    // admin/book/alaldinList -> reg
    @PostMapping("reg")
    public Integer reg(@RequestBody List<Book> list){
        
        if(list == null)
            return null;

        List<Category> categoryList = categoryService.getList();

        Integer insertedCount = service.reg(list, categoryList);
        System.out.println("인서트개수 = "+insertedCount);

        return insertedCount;
    }


    @GetMapping("getByISBN13")
    public Book getByISBN13(String isbn13){

        Book book = new Book();
        Integer result = apiService.getByISBN13(book,isbn13);

        return book;
    }
}
