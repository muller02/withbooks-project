package kr.withbooks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.service.BookService;


@Controller
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("/list")
    public String list(Model model) {
        List<BookView> list = service.getList();

        model.addAttribute("list", list);
        System.out.println(list);
        return "/book/list";
    }

    @GetMapping("detail")
    public String detail(Model model, @RequestParam Long id) {
        Book book = service.get(id);
        System.out.println("book = " + book);
        model.addAttribute("book", book);

        // 깃 클론 및 커밋  
        return "book/detail";
    }

}
