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
import kr.withbooks.web.service.BookService;

@Controller("adminBookController")
@RequestMapping("admin/book")
public class BookController {
    
    @Autowired
    private BookService service;

    @GetMapping("list")
    public String list( @RequestParam(name = "c", required = false) Long categoryId, 
                        @RequestParam(name = "q", required = false) String query, 
                        @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
                        Model model){

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
        model.addAttribute("list", list);

        return "admin/book/list";
    }

    @GetMapping("detail")
    public String detail(@RequestParam("id")Long id
                        ,Model model){
        BookView book = service.get(id);
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
