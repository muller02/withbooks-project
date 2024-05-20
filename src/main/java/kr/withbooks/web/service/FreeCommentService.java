package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.FreeCommentView;

public interface FreeCommentService {

    int getCount(Long freeBoardId);

    List<FreeCommentView> getList(Long freeBoardId);

    int reg(Long freeBoardId, Long userId, String comment);

    int delete(Long id);
    
}
