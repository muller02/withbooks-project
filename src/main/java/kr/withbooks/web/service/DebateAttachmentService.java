package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateAttachment;

import java.util.List;

public interface DebateAttachmentService {

    void add(Long boardId, List<DebateAttachment> debateAttachments);

    //List<DebateAttachment> getListById(Long boardId);

    List<DebateAttachment> getAllFileByBoardId(Long boardId);

    List<DebateAttachment> getAllFileByIds(List<Long> ids);

    void deleteAllFileByIds(List<Long> ids);

}
