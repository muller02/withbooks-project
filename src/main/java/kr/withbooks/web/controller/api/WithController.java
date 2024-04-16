package kr.withbooks.web.controller.api;

import kr.withbooks.web.entity.With;
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

    // 자바스크립트에서 카테고리별 위드 목록을 출력하기 위한 api 컨트롤러
    @GetMapping("list")
    public List<With> list(@RequestParam(name = "c", required = false) Long[] categoryId) {

        return service.getList(categoryId);
    }
}
