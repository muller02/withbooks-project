package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookshortsComment;
import kr.withbooks.web.entity.BookshortsCommentView;

@Mapper
public interface BookshortsCommentRepository {
    List<BookshortsCommentView> findAll(Long shortsId);

    int save(BookshortsComment shortsComment);
}
