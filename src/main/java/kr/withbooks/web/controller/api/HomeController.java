package kr.withbooks.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.service.BookService;

@RestController("apiHomeController")
@RequestMapping("api/home")
public class HomeController {
    
    @Autowired
    private BookService bookService;

    
    @GetMapping("new")
    public List<Book> newList(){

        List<Book> list = bookService.getNewList();

        return list;
    }
    
    @GetMapping("bestseller")
    public List<Book> bestsellerList(){

        List<Book> list = bookService.getBestsellerList();

        return list;
    }
}
