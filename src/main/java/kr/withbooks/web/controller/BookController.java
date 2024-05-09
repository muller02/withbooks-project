package kr.withbooks.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.Book;
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
    public String list(
                        @RequestParam(name = "q", required = false) String query
                        ,@RequestParam(name = "c", required = false) Long categoryId
                        // ,@RequestParam(name = "s", required = false) Long size
                        ,@RequestParam(name = "p", required = false, defaultValue = "1") Integer page
                        ,Model model
                        ) {

        // 카테고리 선택하지 않고 책 검색 시 0으로 보내는 값을 null로 처리
        categoryId = categoryId == null || categoryId == 0 ? null : categoryId;
        // 책 기본 출력 사이즈는 12
        int size = 12;

        List<Book> list = new ArrayList<>();
        
        // 카테고리 선택상자에 출력
        List<Category> cateList = categoryService.getList();
        model.addAttribute("category", cateList);

        // 검색한 책의 개수
        int count = service.getCountByParams(size, page, query, categoryId);
        
        // count가 0이라면 list를 검색할 필요가 없음
        if(count != 0)
            list = service.getListByParams(size, page, query, categoryId);
        else
        // count가 0으로 가게되면 html에서 페이징 출력에 버그가 생김
        // 1, 0 페이징이 출력되는 오류로 count = 1 설정
            count = 1;

        model.addAttribute("count", count);
        model.addAttribute("list", list);

        return "/book/list";

    }

    @GetMapping("detail")
    public String detail(Model model
                        , @RequestParam(name="id") Long bookId
                        , @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId =1L;
        // Long userId = userDetails.getId();

        // getView 쓰지 않고 getMapById를 쓰는 이유
        // -> 책 정보와 더불어 회원의 id로 해당 책을 북마크 했는지 여부가 함께 출력되어야 함
        Map<String, Object> bookMap = service.getMapById(bookId, userId);
        System.out.println(bookMap);
        model.addAttribute("book", bookMap);
        return "book/detail";
    }

}
