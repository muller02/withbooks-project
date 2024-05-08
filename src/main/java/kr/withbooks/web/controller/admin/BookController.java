package kr.withbooks.web.controller.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.Book;
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
    public String list( 
                        // @RequestParam(name = "c", required = false) Long categoryId, 
                        // @RequestParam(name = "qt", required = false) String queryType, 
                        // @RequestParam(name = "q", required = false) String query, 
                        // @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
                        @RequestParam Map<String, String> params,
                        Model model){

        System.out.println(params.toString());
        
        List<Book> list = new ArrayList<>();
        // select box로 제목, 저자, ISBN13으로 검색하도록 한다.
        // 이때, 해당 카테고리는 queryType으로 받고, 검색어는 query로 받는다.

        // 카테고리 필터링 -> categoryId로 받는다.

        // 사이즈 및 요청 페이지 -> 추후 처리

        int count = 0;
        if(!params.containsKey("page")){
            int page = 1;
            params.put("page", Integer.toString(page));
        }
        // if(categoryId!=null && query!=null){
        //     list = service.getList(page, query, categoryId);
        //     count = service.getCount(query, categoryId);
        // }
        // else if(query!=null){
        //     list = service.getList(page, query, null);
        //     count = service.getCount(query, null);
        // }
        // else if(categoryId!=null){
        //     list = service.getList(page, null, categoryId);
        //     count = service.getCount(null, categoryId);
        // }
        // else{
            
        //     list = service.getList(page, null, null);
        //     count = service.getCount(null, null);
        // }
        list = service.getListByParams(params);
        count = service.getCountByParams(params);

        List<Category> categoryList = categoryService.getList();
        model.addAttribute("category", categoryList);
        model.addAttribute("list", list);
        model.addAttribute("count", count!=0? count:1);

        return "admin/book/list";
    }

    @GetMapping("detail")
    public String detail(@RequestParam("id")Long id
                        ,Model model){
        Book book = service.getView(id);
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
