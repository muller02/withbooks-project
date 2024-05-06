package kr.withbooks.web.controller.api;

import kr.withbooks.web.entity.DebateAttachment;
import kr.withbooks.web.service.DebateAttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/with/debate/board")
@RequiredArgsConstructor
public class DebateAttachmentController {

    private final DebateAttachmentService debateAttachmentService;

    @GetMapping("/files/{boardId}")
    public List<DebateAttachment> files(@PathVariable("boardId") Long boardId) {
        List<DebateAttachment> attachmentFiles = debateAttachmentService.getListById(boardId);
        return attachmentFiles;
    }
}
