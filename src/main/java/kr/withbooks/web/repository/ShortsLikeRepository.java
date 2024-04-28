package kr.withbooks.web.repository;

import kr.withbooks.web.entity.ShortsLike;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ShortsLikeRepository {

    public  int save(ShortsLike shortsLike);

    public ShortsLike findByLiked(ShortsLike shortsLike);

    public  int delete(ShortsLike shortsLike);


    int findByShortsId(Long shortsId);
}
