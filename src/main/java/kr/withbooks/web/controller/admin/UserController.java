package kr.withbooks.web.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.Bookshorts;
import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;


@Controller("adminUserController")
@RequestMapping("admin/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "id", required = false) Long id
        ,@RequestParam(name = "nickname", required = false) String nickname
        ,@RequestParam(name = "email", required = false) String email
        ,@RequestParam(name = "gender", required = false) Integer gender
        ,@RequestParam(name = "status", required = false) Integer status
        ,@RequestParam(name = "birthyear", required = false) String birthyear
        ,@RequestParam(name = "start-date", required = false) String startDate
        ,@RequestParam(name = "end-date", required = false) String endDate
        ,Model model
    ) {

        List<User> list = service.get(id, nickname, email, birthyear, gender, startDate, endDate, status); 
        
        model.addAttribute("id", id);
        model.addAttribute("nickname", nickname);
        model.addAttribute("email", email);
        model.addAttribute("gender", gender);
        model.addAttribute("status", status);
        model.addAttribute("birthyear", birthyear);
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        model.addAttribute("list", list);

        System.out.println(list.get(0));

        return "admin/user/list";
    }

    @GetMapping("detail")
    public String detail(
        @RequestParam(name = "id", required = true) Long id
        , Model model
    ) {

        User user = service.getById(id);
        List<BookshortsView> list = service.getByIdShorts(id);   
             
        model.addAttribute("user", user);
        model.addAttribute("list", list);

        return "admin/user/detail";
    }
    
    
    
}
