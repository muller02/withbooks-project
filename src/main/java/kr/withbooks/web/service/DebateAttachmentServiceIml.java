package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateAttachment;
import kr.withbooks.web.repository.DebateAttachmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Slf4j
@Service
public class DebateAttachmentServiceIml implements DebateAttachmentService {

    @Autowired
    private DebateAttachmentRepository debateAttachmentRepository;

    @Override
    public void add(Long boardId, List<DebateAttachment> debateAttachments) {

        log.info("boardId: {}, debateAttachments: {}", boardId, debateAttachments);

        if (CollectionUtils.isEmpty(debateAttachments)) {
            return;
        }

        for (DebateAttachment debateAttachment : debateAttachments) {
            debateAttachment.setBoardId(boardId);
        }

        log.info("debateAttachments: {}", debateAttachments);

        debateAttachmentRepository.save(debateAttachments);

    }

    @Override
    public List<DebateAttachment> getListById(Long boardId) {
        return debateAttachmentRepository.findAllById(boardId);
    }

}
