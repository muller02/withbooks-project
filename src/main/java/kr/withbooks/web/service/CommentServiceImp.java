package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.ShortsComment;
import kr.withbooks.web.entity.ShortsCommentView;
import kr.withbooks.web.repository.CommentRepository;

@Service
public class CommentServiceImp implements  CommentService{

    @Autowired
    private CommentRepository repository;

    @Override
    public List<ShortsCommentView> getList(Long shortsId) {
       return repository.findAll(shortsId);
        
    }

    @Override
    public int reg(ShortsComment shortsComment) {
  
        int result = repository.save(shortsComment);
 
        return result; 
    }


}
