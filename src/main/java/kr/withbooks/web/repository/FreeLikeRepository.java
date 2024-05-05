package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FreeLikeRepository {

    int count(Long freeBoardId);

    int insert(Long freeBoardId, Long userId);

    boolean isLiked(Long freeBoardId, Long id);

    int delete(Long freeBoardId, Long userId);
    
}
