package kr.withbooks.web.api;


import kr.withbooks.web.entity.Book;
import kr.withbooks.web.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiBookController")
@RequestMapping("api/book")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("list")
    public List<Book> list(@RequestParam(name = "q", required = false) String query) {
        System.out.println(query);
        List<Book> list = service.getList(query);

        return list;

    }
}
