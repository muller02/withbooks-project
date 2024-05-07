package kr.withbooks.web.service;

public interface FreeLikeService {

    int getCount(Long freeBoardId);

    int like(Long freeBoardId, Long userId);

    int deleteLike(Long freeBoardId, Long user);

    boolean isLiked(Long freeBoardId, Long userId);

    
}
