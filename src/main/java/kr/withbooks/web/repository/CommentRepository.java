package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.ShortsComment;
import kr.withbooks.web.entity.ShortsCommentView;

@Mapper
public interface CommentRepository {
    List<ShortsCommentView> findAll(Long shortsId);

    int save(ShortsComment shortsComment);
}
