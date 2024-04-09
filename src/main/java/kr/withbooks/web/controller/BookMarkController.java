package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("bookmark")
public class BookMarkController {
    
    // @Autowired
    // private BookMarkService;

    @GetMapping("list")
    public String list(){

        return "bookmark/list";
    }
}
