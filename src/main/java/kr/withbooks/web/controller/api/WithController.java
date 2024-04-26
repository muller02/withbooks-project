package kr.withbooks.web.controller.api;


import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithCategoryService;
import kr.withbooks.web.service.WithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiWithController")
@RequestMapping("api/with")
public class WithController {

    @Autowired
    private WithService service;
    @GetMapping
    List<WithView> list(@RequestParam(name = "c", required = false) Long[] categoryIds,
                        @RequestParam(name = "q" ,required = false) String query,
                        @RequestParam(name = "f", required = false) Long faceYn){



        return service.getList(categoryIds,query,faceYn);
    }



    @GetMapping("check-name")
    boolean checkWithName(@RequestParam(name = "n", required = false) String withName){

            boolean checkName = service.getName(withName);

        return checkName;
    }
}
