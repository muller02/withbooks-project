package kr.withbooks.web.controller.api;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.DebateComment;
import kr.withbooks.web.entity.DebateCommentView;
import kr.withbooks.web.service.DebateCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/with/debate/board")
public class DebateBoardCommentController {

    private final DebateCommentService debateCommentService;

//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/{boardId}/comments")
//    public List<DebateCommentView> list(@PathVariable Long boardId) {
//
//        List<DebateCommentView> commentList = debateCommentService.getListById(boardId);
//        return commentList;
//    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{boardId}/comments")
    public DebateComment reg(@PathVariable Long boardId, @RequestBody DebateComment debateComment,
                            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId();

        debateComment.setUserId(userId);
        debateComment.setBoardId(boardId);
        Long commentId = debateCommentService.save(debateComment);
        DebateComment findComment = debateCommentService.getById(commentId);
        return findComment;
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{boardId}/comments/{id}")
    public Long edit(@PathVariable Long boardId, @RequestBody DebateComment debateEditComment,
                             @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId();

        debateEditComment.setUserId(userId);
        debateEditComment.setBoardId(boardId);
        Long updateId = debateCommentService.edit(debateEditComment.getId(), debateEditComment);

        log.info("updateId : {}", updateId);
        return updateId;

    }



    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{boardId}/comments/{id}")
    public Long delete(@PathVariable Long boardId, @PathVariable Long id) {
        return debateCommentService.deleteById(id);
    }
}
