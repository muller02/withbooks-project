package kr.withbooks.web.controller.api;

import java.util.List;

import kr.withbooks.web.config.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.BookshortsComment;
import kr.withbooks.web.entity.BookshortsCommentView;
import kr.withbooks.web.service.BookshortsCommentService;

@RestController("apiCommentController")
@RequestMapping("api/comments")
public class BookshortsCommentController {
    
    @Autowired
    private BookshortsCommentService service;


    
    @PostMapping
    public boolean reg(@RequestBody BookshortsComment shortsComment, @AuthenticationPrincipal CustomUserDetails userDetails) {

        if(userDetails ==null)
            return false;

        Long userId = userDetails.getId();

        System.out.println("딸기= " + shortsComment.toString());
                                        
        //BookshortsComment shortsComment = shortsComment;

        // spring security 한 후에 set 할 것임. 현재 상수로 박아둠.
        shortsComment.setUserId(userId);

        int result = service.reg(shortsComment);


        return true;

    }
    

    @GetMapping("list")
    public List<BookshortsCommentView> list(@RequestParam(name = "shorts_id", required = false) Long shortsId) {
        
        List<BookshortsCommentView> list = service.getList(shortsId);

        return list;

    }

  
}
