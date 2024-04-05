package kr.withbooks.web.repository;

import kr.withbooks.web.entity.ShortsView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShortsViewRepository {
    
    List<ShortsView> findAll(Long bookId);
}
