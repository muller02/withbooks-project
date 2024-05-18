package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.FreeCommentView;

@Mapper
public interface FreeCommentRepository {

    int count(Long freeBoardId);

    List<FreeCommentView> findAll(Long freeBoardId);

    int insert(Long freeBoardId, Long userId, String comment);

    int remove(Long id);
    
}
