package kr.withbooks.web.controller.api;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.service.AladdinAPIService;
import kr.withbooks.web.service.BookService;

@RestController("apiBookController")
@RequestMapping("api/book")
public class BookController {

    @Autowired
    private BookService service;

    @Autowired
    private AladdinAPIService apiService;

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
    @GetMapping("getByISBN13")
    public Book getByISBN13(String isbn13){

        Book book = apiService.getByISBN13(isbn13);

        return null;
    }
}
