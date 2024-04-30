package kr.withbooks.web.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.CategoryService;

@Controller("adminBookController")
@RequestMapping("admin/book")
public class BookController {
    
    @Autowired
    private BookService service;
    @Autowired
    private CategoryService categoryService;

    @GetMapping("list")
    public String list( @RequestParam(name = "c", required = false) Long categoryId, 
                        @RequestParam(name = "qt", required = false) String queryType, 
                        @RequestParam(name = "q", required = false) String query, 
                        @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
                        Model model){


        // select box로 제목, 저자, ISBN13으로 검색하도록 한다.
        // 이때, 해당 카테고리는 queryType으로 받고, 검색어는 query로 받는다.

        // 카테고리 필터링 -> categoryId로 받는다.

        // 사이즈 및 요청 페이지 -> 추후 처리

        List<BookView> list = new ArrayList<>();

        int count = 0;
        // if(categoryId!=null){
        //     list = service.getList(page, categoryId);
        //     count = service.getCount(categoryId);
        // }
        // else if(query!=null){
        //     list = service.getList(page, query);
        //     count = service.getCount(query);
        // }
        // else{
            
        //     list = service.getList(page);
        //     count = service.getCount();
        // }
        list = service.getList();
        // System.out.println("BookView = "+list.toString());


        List<Category> categoryList = categoryService.getList();
        model.addAttribute("category", categoryList);
        model.addAttribute("list", list);

        return "admin/book/list-dev";
    }

    @GetMapping("detail")
    public String detail(@RequestParam("id")Long id
                        ,Model model){
        BookView book = service.getView(id);
        model.addAttribute("book", book);
        return "admin/book/detail";
    }

    @GetMapping("reg")
    public String reg(){

        return "admin/book/reg";
    }

    @PostMapping("reg")
    public String save(Book book){

        System.out.println("Book = "+book.toString());
        return "redirect:admin/book/list";
    }


}
