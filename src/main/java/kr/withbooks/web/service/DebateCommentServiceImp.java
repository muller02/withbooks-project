package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateComment;
import kr.withbooks.web.repository.DebateCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebateCommentServiceImp implements DebateCommentService {

    @Autowired
    private DebateCommentRepository debateCommentRepository;

    @Override
    public Long save(DebateComment debateComment) {
        debateCommentRepository.save(debateComment);
        return debateComment.getId();
    }

    @Override
    public DebateComment getById(Long id) {
        DebateComment debateComment = debateCommentRepository.findById(id);
        return debateComment;
    }

    @Override
    public List<DebateComment> getAllById(Long boardId) {
        List<DebateComment> commentList = debateCommentRepository.findAllById(boardId);
        return commentList;
    }

    @Override
    public Long deleteById(Long id) {
        debateCommentRepository.deleteById(id);
        return id;
    }
}
