package kr.withbooks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.BooklogView;
import kr.withbooks.web.service.BooklogService;

@Controller
@RequestMapping("booklog")
public class BooklogController {
    
    @Autowired
    private BooklogService service;

    @GetMapping("list")
    public String list(Model model){

        //[ ]  제거 예정
        Long id = 4L;
        
        List<BooklogView> list = service.getList(id);

        model.addAttribute("list", list);        
        
        return "booklog/list";
    }

    @GetMapping("detail")
    public String detail(Model model, @RequestParam(name="id", required= false) Long id ){

        BooklogView log = service.getById(id);

        model.addAttribute("log", log);

        System.out.println("log : " + log);
        
        return "booklog/detail";
    }

    @PostMapping("delete")
    public String delete(
                        @RequestParam(name="ids", required= true) List<Integer> ids 
                        ){

        Long userId = null;
        if(ids!=null && ids.size() > 0)
            service.deleteAllByIds(ids, userId);

        return "redirect:list";
    }
}
