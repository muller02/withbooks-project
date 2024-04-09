package kr.withbooks.web.service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.ShortsComment;
import kr.withbooks.web.entity.ShortsCommentView;

import java.util.List;

public interface CommentService {
    

    List<ShortsCommentView> getList(Long shortsId);


    int reg(ShortsComment shortsComment);

    
}
