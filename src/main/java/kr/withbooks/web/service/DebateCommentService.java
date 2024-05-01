package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateComment;

import java.util.List;

public interface DebateCommentService {

    Long save(DebateComment debateComment);

    DebateComment getById(Long id);

    List<DebateComment> getAllById(Long boardId);

    Long deleteById(Long id);

//    DebateComment getByBoardId(Long boardId);
}
