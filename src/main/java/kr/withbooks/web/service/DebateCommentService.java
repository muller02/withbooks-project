package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateComment;
import kr.withbooks.web.entity.DebateCommentView;

import java.util.List;

public interface DebateCommentService {

    Long save(DebateComment debateComment);

    DebateComment getById(Long id);

    List<DebateCommentView> getListById(Long boardId);

    Long deleteById(Long id);

    Long edit(Long id, DebateComment debateComment);
//    DebateComment getByBoardId(Long boardId);
}
