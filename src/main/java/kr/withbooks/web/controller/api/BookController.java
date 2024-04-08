package kr.withbooks.web.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.service.BookService;

@RestController("apiBookController")
@RequestMapping("api/book")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("list")
    public List<BookView> list(@RequestParam(name = "q", required = false) String query) {
        System.out.println(query);
        List<BookView> list = service.getList(query);

        return list;

    }
}
