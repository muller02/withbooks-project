package kr.withbooks.web.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.service.BookshortsAttachmentService;
import kr.withbooks.web.service.BookshrotsService;

@RestController("apiBookShortsController")
@RequestMapping("/api/bookShorts")
public class BookShortsController {

    @Autowired
    private BookshrotsService service;
    
    @Autowired
    private BookshortsAttachmentService shortsAttachmentService;

    @GetMapping("list")
    public List<BookshortsView> getList(
                                    @AuthenticationPrincipal  CustomUserDetails userDetails,
                                    @RequestParam(name = "id", required = false) Long bookId,
                                    @RequestParam(name="ls") Long lastShortsId
                                    ){
        Long userId = 1L;
        if(userDetails != null)
            userId = userDetails.getId();

        List<BookshortsView> list = service.getView(bookId, userId, lastShortsId);
        
        System.out.println("=================================================================");
        System.out.println(list);

        return list;
    }

}
