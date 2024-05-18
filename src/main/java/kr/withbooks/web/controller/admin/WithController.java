package kr.withbooks.web.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithService;


@Controller("adminWithController")
@RequestMapping("admin/with")
public class WithController {

    @Autowired
    private WithService service;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "c") String category,
        @RequestParam(name = "q") String query,
        @RequestParam(name = "s") String sort,
        @RequestParam(name = "p") Integer page,
        Model model) {



        List<WithView> list = null;

        switch (category) {
            case "id":
                if(!"".equals(query))
                    list = service.getList(null, null, null, Long.parseLong(query), null, null, sort, page);
                break;
            case "with-name":
                list = service.getList(null, null, null, null, query, null, sort, page);
                break;
            case "with-top":
                list = service.getList(null, null, null, null, null, query, sort, page);
                break;
        }

        if("".equals(query))
            list = service.getList(null, null, null, null, null, null, sort, page);

        
        model.addAttribute("count", 1000);
        model.addAttribute("list", list);

        return "/admin/with/list";
    }
    
    
}
