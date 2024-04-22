package kr.withbooks.web.repository;


import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.Bookshorts;

@Mapper
public interface BookshortsRepository {
    void save(Bookshorts shorts);

    Bookshorts findById(Long shortsId);

    void blindById(Long shortsId);
}
