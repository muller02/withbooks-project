package kr.withbooks.web.controller.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.BookshrotsService;
import kr.withbooks.web.service.UserService;



@Controller("adminUserController")
@RequestMapping("admin/user")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private BookshrotsService bookshortService;

    @GetMapping("list")
    public String list(
        @RequestParam Map<String, String> params
        ,Model model
    ) {
        
        if(!params.containsKey("p")){
            int page = 1;
            params.put("p", Integer.toString(page));
        }
        
        List<User> list = service.get(params); 
        Integer count = service.getCount(params);
        
        model.addAttribute("list", list);
        model.addAttribute("count", count!=0? count:1);

        return "admin/user/list";
    }

    @GetMapping("detail")
    public String detail(
        @RequestParam(name = "id", required = true) Long id
        , Model model
    ) {

        System.out.println("id : " + id);

        User user = service.getById(id);
        List<BookshortsView> list = bookshortService.getById(id);
             
        model.addAttribute("user", user);
        model.addAttribute("list", list);

        return "admin/user/detail";
    }  

    
}
