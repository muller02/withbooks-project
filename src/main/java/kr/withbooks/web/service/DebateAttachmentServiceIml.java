package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateAttachment;
import kr.withbooks.web.repository.DebateAttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class DebateAttachmentServiceIml implements DebateAttachmentService {

    @Autowired
    private DebateAttachmentRepository debateAttachmentRepository;

    @Override
    public void add(Long boardId, List<DebateAttachment> debateAttachments) {

        System.out.println("boardId = " + boardId);

        if (CollectionUtils.isEmpty(debateAttachments)) {
            return;
        }

        for (DebateAttachment debateAttachment : debateAttachments) {
            debateAttachment.setBoardId(boardId);
        }

        System.out.println("debateAttachments = " + debateAttachments);
        debateAttachmentRepository.save(debateAttachments);

    }
}
