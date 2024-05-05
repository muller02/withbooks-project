package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.FreeAttachment;

public interface FreeAttachmentService {

    List<FreeAttachment> getList(Long freeBoardId);
    
}
