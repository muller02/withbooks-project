package kr.withbooks.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller("adminWithController")
@RequestMapping("admin/with")
public class WithController {

    @GetMapping("list")
    public String list() {
        return "/admin/with/list";
    }
    
    
}
