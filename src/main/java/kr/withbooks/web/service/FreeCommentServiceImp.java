package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.FreeCommentView;
import kr.withbooks.web.repository.FreeCommentRepository;

@Service
public class FreeCommentServiceImp implements FreeCommentService{

    @Autowired
    private FreeCommentRepository repository;

    @Override
    public int getCount(Long freeBoardId) {
        return repository.count(freeBoardId);
    }

    @Override
    public List<FreeCommentView> getList(Long freeBoardId) {
        return repository.findAll(freeBoardId);
    }

    @Override
    public int reg(Long freeBoardId, Long userId, String comment) {
        return repository.insert(freeBoardId, userId, comment);
    }

    @Override
    public int delete(Long id) {
        return repository.remove(id);
    }
    
}
