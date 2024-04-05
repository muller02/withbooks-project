package kr.withbooks.web.repository;


import kr.withbooks.web.entity.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryRepository {

    List<Category> findAll();

    List<Category> findById(Long id);
}
