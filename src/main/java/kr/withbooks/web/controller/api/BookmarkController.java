package kr.withbooks.web.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.service.BookmarkService;

@RestController("apiBookmarkController")
@RequestMapping("api/bookmark")
public class BookmarkController {
    
    @Autowired
    private BookmarkService service;

    @GetMapping("add")
    public int add(
                    @RequestParam(name="bookId", required = true) Long bookId
                    ){
        
        Long userId = 1L;
        int result = 0;

        if(userId == null || bookId == null)
            result = 0;
        else
            result = service.add(bookId, userId);

        System.out.println("result = "+result);

        return result;
    }

    @GetMapping("delete")
    public int delete(
                @RequestParam(name="bookId", required = true) Long bookId
                ){
        Long userId = 1L;
        int result = 0;

        if(userId == null || bookId == null)
            result = 0;
        else
            result = service.delete(bookId, userId);
        

        System.out.println("result = "+result);

        return result;

    }
}
