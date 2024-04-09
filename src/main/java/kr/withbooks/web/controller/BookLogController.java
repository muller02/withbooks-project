package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("booklog")
public class BookLogController {
    
    // @Autowired
    // private BooklogService;

    @GetMapping("list")
    public String list(){
        return "booklog/list";
    }
}
