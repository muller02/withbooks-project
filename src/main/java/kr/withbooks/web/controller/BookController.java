package kr.withbooks.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.BookView;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.CategoryService;


@Controller
@RequestMapping("book")
public class BookController {

    @Autowired
    private BookService service;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("list")
    public String list(Model model) {
        List<BookView> list = service.getList();
        List<Category> cateList = categoryService.getList();

        model.addAttribute("list", list);
        model.addAttribute("category", cateList);
        // System.out.println(list);
        return "/book/list";
    }

    @GetMapping("detail")
    public String detail(Model model
                        , @RequestParam(name="id") Long bookId) {

        Long userId = 1L;

        // getView 쓰지 않고 getMapById를 쓰는 이유
        // -> 책 정보와 더불어 회원의 id로 해당 책을 북마크 했는지 여부가 함께 출력되어야 함
        Map<String, Object> bookMap = service.getMapById(bookId, userId);
        System.out.println(bookMap);
        model.addAttribute("book", bookMap);
        return "book/detail";
    }

}
