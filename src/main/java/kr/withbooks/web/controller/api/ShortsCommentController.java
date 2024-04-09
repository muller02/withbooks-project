package kr.withbooks.web.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.ShortsComment;
import kr.withbooks.web.entity.ShortsCommentView;
import kr.withbooks.web.service.CommentService;

@RestController("apiCommentController")
@RequestMapping("api/comments")
public class ShortsCommentController {
    
    @Autowired
    private CommentService service;

    @PostMapping
    public int reg(@RequestBody ShortsComment shortsComment ) {

        System.out.println("딸기= " + shortsComment.toString());
                                        
        // ShortsComment shortsComment = shortsComment;

        // spring security 한 후에 set 할 것임. 현재 상수로 박아둠.
        shortsComment.setUserId(1L);

        int result = service.reg(shortsComment);


        return result;

    }
    

    @GetMapping("list")
    public List<ShortsCommentView> list(@RequestParam(name = "shorts_id", required = false) Long shortsId) {
        
        List<ShortsCommentView> list = service.getList(shortsId);

        return list;

    }

  
}
