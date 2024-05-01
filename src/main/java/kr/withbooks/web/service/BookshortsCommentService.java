package kr.withbooks.web.service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.BookshortsComment;
import kr.withbooks.web.entity.BookshortsCommentView;

import java.util.List;

public interface BookshortsCommentService {
    

    List<BookshortsCommentView> getList(Long shortsId);


    int reg(BookshortsComment shortsComment);


    boolean blindById(Long cmtId);
}
