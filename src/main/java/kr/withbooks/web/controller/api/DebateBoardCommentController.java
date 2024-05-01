package kr.withbooks.web.controller.api;

import kr.withbooks.web.entity.DebateComment;
import kr.withbooks.web.service.DebateCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/with/debate/board")
public class DebateBoardCommentController {

    @Autowired
    private DebateCommentService debateCommentService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{boardId}/comments")
    public List<DebateComment> list(@PathVariable Long boardId) {

        List<DebateComment> commentList = debateCommentService.getAllById(boardId);
        return commentList;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{boardId}/comments")
    public DebateComment reg(@PathVariable Long boardId, @RequestBody DebateComment debateComment) {
        Long userId = 4L;

        debateComment.setUserId(userId);
        debateComment.setBoardId(boardId);
        Long commentId = debateCommentService.save(debateComment);
        DebateComment findComment = debateCommentService.getById(commentId);
        return findComment;
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{boardId}/comments/{id}")
    public Long delete(@PathVariable Long boardId, @PathVariable Long id) {
        return debateCommentService.deleteById(id);
    }
}
