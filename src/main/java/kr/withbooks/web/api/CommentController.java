package kr.withbooks.web.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.ShortsCommentView;
import kr.withbooks.web.service.CommentService;

@RestController("apiCommentController")
@RequestMapping("api/comment")
public class CommentController {
    
    @Autowired
    private CommentService service;

    @GetMapping("list")
    public List<ShortsCommentView> list(@RequestParam(name = "shorts_id", required = false) Long shortsId) {
        
        List<ShortsCommentView> list = service.getList(shortsId);

        return list;

    }
}
