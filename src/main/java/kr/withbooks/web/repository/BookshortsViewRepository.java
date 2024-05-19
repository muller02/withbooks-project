package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BookshortsView;

@Mapper
public interface BookshortsViewRepository {
    
    List<BookshortsView> findAll(Long bookId, Long userId);
    
    List<BookshortsView> findAllBestShorts();
}
