package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.BookshortsComment;
import kr.withbooks.web.entity.BookshortsCommentView;
import kr.withbooks.web.repository.BookshortsCommentRepository;

@Service
public class BookshortsCommentServiceImp implements  BookshortsCommentService{

    @Autowired
    private BookshortsCommentRepository repository;

    @Override
    public List<BookshortsCommentView> getList(Long shortsId) {
       return repository.findAll(shortsId);
        
    }

    @Override
    public int reg(BookshortsComment shortsComment) {
  
        int result = repository.save(shortsComment);
 
        return result; 
    }


}
