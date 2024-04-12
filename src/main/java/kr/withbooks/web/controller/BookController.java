package kr.withbooks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.CategoryService;


@Controller
@RequestMapping("book")
public class BookController {

    @Autowired
    private BookService service;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("list")
    public String list(Model model) {
        List<BookView> list = service.getList();
        List<Category> cateList = categoryService.getList();

        model.addAttribute("list", list);
        model.addAttribute("category", cateList);
        // System.out.println(list);
        return "/book/list";
    }

    @GetMapping("detail")
    public String detail(Model model, @RequestParam Long id) {
        BookView book = service.getView(id);
        System.out.println("book = " + book);
        model.addAttribute("book", book);

        // 깃 클론 및 커밋  
        return "book/detail";
    }

}
