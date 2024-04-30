package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DebateCommentRepository {

    void save(DebateComment debateComment);

    DebateComment findById(Long commentId);

    List<DebateComment> findAllById(Long boardId);

    void deleteById(Long id);
}
