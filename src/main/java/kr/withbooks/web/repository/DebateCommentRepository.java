package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateComment;
import kr.withbooks.web.entity.DebateCommentView;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DebateCommentRepository {

    void save(DebateComment debateComment);

    DebateComment findById(Long commentId);

    List<DebateCommentView> findAllById(Long boardId);

    void deleteById(Long id);

//    DebateComment findByBoardId(Long boardId);
}
