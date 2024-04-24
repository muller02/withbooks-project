package kr.withbooks.web.controller.api;


import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithCategoryService;
import kr.withbooks.web.service.WithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiWithController")
@RequestMapping("api/with")
public class WithController {

    @Autowired
    private WithService service;
    @GetMapping
    List<WithView> list(@RequestParam(name = "c", required = false) Long[] categoryIds,
                        @RequestParam(name = "q" ,required = false) String query){

        return service.getList(categoryIds,query);
    }
}
