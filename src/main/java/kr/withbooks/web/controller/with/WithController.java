package kr.withbooks.web.controller.with;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithService;

@Controller
@RequestMapping("with")
public class WithController {

    @Autowired
    private WithService service;

    @GetMapping("list")
    public String list(Model model) {

        // 데이터베이스에서 정보 가져와 list에 담기
        List<WithView> list = service.getList();

        // 위드별 선택한 주요카테고리 뿌려주기
        for (WithView withView : list) {
            Long withId = withView.getId();
            List<String> categoryNames = service.getWithCategoryNames(withId);
            withView.setCategoryNames(categoryNames);
        }


        // 뷰에 데이터 전달
        model.addAttribute("list", list);
        System.out.println(list);

        return "/with/list";
    }

    @GetMapping("reg")
    public String reg() {

        return "/with/reg";
    }
}
