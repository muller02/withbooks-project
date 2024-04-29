package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateAttachment;

import java.util.List;

public interface DebateAttachmentService {

    void add(Long boardId, List<DebateAttachment> debateAttachments);
}
