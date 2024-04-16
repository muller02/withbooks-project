package kr.withbooks.web.repository;


import kr.withbooks.web.entity.Shorts;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ShortsRepository {
    void save(Shorts shorts);

    Shorts findById(Long shortsId);
}
