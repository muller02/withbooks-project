package kr.withbooks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.BookmarkView;
import kr.withbooks.web.service.BookmarkService;

@Controller
@RequestMapping("bookmark")
public class BookMarkController {
    
    @Autowired
    private BookmarkService service;

    @GetMapping("list")
    public String list(
                        @RequestParam(name="p", required= false) Integer p 
                        ,Model model
                        ){
        List<BookmarkView> list = service.getList(p);
        model.addAttribute("list", list);
        
        return "bookmark/list";
    }

    @PostMapping("delete")
    public String delete(
                        @RequestParam(name="ids", required= true) List<Integer> list 
                        ){
        System.out.println(list.toString());
        return "redirect:bookmark/list";
    }
}
